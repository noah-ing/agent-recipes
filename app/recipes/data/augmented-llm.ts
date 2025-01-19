import { Recipe } from './index';

export const augmentedLlm: Recipe = {
  title: "Augmented LLM",
  tag: "Architecture",
  description: "An enhanced LLM architecture that extends the model's capabilities through integration with external retrieval systems, tools, and memory components.",
  explanation: "The diagram shows how an LLM can be augmented with three key components: a retrieval system for accessing external knowledge, tools for performing specific actions, and a memory system for maintaining context. These components interact bidirectionally with the LLM, allowing it to query information, use tools, and maintain state across interactions.",
  useCases: [
    "Knowledge-Intensive Tasks: Augment LLM responses with real-time information from external sources.",
    "Tool-Using Agents: Enable LLMs to interact with external tools and APIs to perform specific actions.",
    "Stateful Applications: Maintain conversation history and context across multiple interactions."
  ],
  pythonCode: `from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime
import chromadb
from helpers import run_llm, JSON_llm, execute_tool

class Memory(BaseModel):
    """Represents a memory entry"""
    timestamp: datetime
    content: str
    type: str
    metadata: Dict[str, Any]

class RetrievalResult(BaseModel):
    """Represents a retrieval result"""
    content: str
    source: str
    relevance: float

class AugmentedLLM:
    def __init__(self):
        # Initialize components
        self.memory = []
        self.retrieval_client = chromadb.Client()
        self.tools = self._initialize_tools()
        
    def _initialize_tools(self) -> Dict[str, Any]:
        """Initialize available tools"""
        return {
            "calculator": {
                "description": "Perform mathematical calculations",
                "function": self._calculate
            },
            "web_search": {
                "description": "Search the web for information",
                "function": self._search_web
            },
            "database": {
                "description": "Query a database",
                "function": self._query_database
            }
        }
    
    async def retrieve_relevant_info(
        self, 
        query: str,
        k: int = 5
    ) -> List[RetrievalResult]:
        """Retrieve relevant information from the knowledge base"""
        RETRIEVAL_PROMPT = """Given this query, what specific information should we look for?
        Query: {query}
        
        Return as JSON with:
        - search_terms: list of relevant terms
        - filters: any filters to apply
        """
        
        search_params = await JSON_llm(
            RETRIEVAL_PROMPT.format(query=query),
            dict
        )
        
        # Search vector database
        results = self.retrieval_client.query(
            query_texts=[query],
            n_results=k,
            where=search_params.get("filters", {})
        )
        
        return [
            RetrievalResult(
                content=doc["content"],
                source=doc["metadata"]["source"],
                relevance=score
            )
            for doc, score in zip(results["documents"], results["distances"])
        ]
    
    async def determine_tool_needs(
        self,
        query: str,
        context: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Determine which tools are needed"""
        TOOL_PROMPT = """Given this query and context, what tools should be used?
        
        Query: {query}
        Context: {context}
        Available Tools: {tools}
        
        Return as JSON array of:
        - tool_name: name of tool to use
        - reason: why this tool is needed
        - parameters: parameters to pass to tool
        """
        
        return await JSON_llm(
            TOOL_PROMPT.format(
                query=query,
                context=context,
                tools=self.tools
            ),
            List[Dict[str, Any]]
        )
    
    async def execute_tools(
        self,
        tool_calls: List[Dict[str, Any]]
    ) -> List[Any]:
        """Execute required tools"""
        results = []
        for call in tool_calls:
            tool = self.tools[call["tool_name"]]
            result = await tool["function"](**call["parameters"])
            results.append(result)
        return results
    
    def update_memory(
        self,
        content: str,
        memory_type: str,
        metadata: Dict[str, Any] = None
    ) -> None:
        """Update system memory"""
        self.memory.append(Memory(
            timestamp=datetime.now(),
            content=content,
            type=memory_type,
            metadata=metadata or {}
        ))
    
    async def process_query(self, query: str) -> str:
        """Process a query using augmented capabilities"""
        # Step 1: Retrieve relevant information
        relevant_info = await self.retrieve_relevant_info(query)
        
        # Step 2: Determine required tools
        context = {
            "relevant_info": relevant_info,
            "recent_memory": self.memory[-5:] if self.memory else []
        }
        tool_calls = await self.determine_tool_needs(query, context)
        
        # Step 3: Execute tools
        tool_results = await self.execute_tools(tool_calls)
        
        # Step 4: Generate response
        RESPONSE_PROMPT = """Generate a response using all available information:
        
        Query: {query}
        Retrieved Information: {retrieved}
        Tool Results: {tool_results}
        Recent Memory: {memory}
        
        Synthesize this information into a comprehensive response."""
        
        response = await run_llm(
            RESPONSE_PROMPT.format(
                query=query,
                retrieved=relevant_info,
                tool_results=tool_results,
                memory=self.memory[-5:]
            )
        )
        
        # Step 5: Update memory
        self.update_memory(
            content=response,
            memory_type="response",
            metadata={"query": query}
        )
        
        return response

# Example usage
async def main():
    # Initialize augmented LLM
    llm = AugmentedLLM()
    
    # Process a complex query
    query = """What was the impact of recent interest rate changes 
    on tech company stock prices? Calculate the average percentage change 
    and identify any significant outliers."""
    
    response = await llm.process_query(query)
    print("Response:", response)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM, JSONLLM, executeTool } from './helpers';
import { ChromaClient } from 'chromadb';

interface Memory {
  timestamp: Date;
  content: string;
  type: string;
  metadata: Record<string, any>;
}

interface RetrievalResult {
  content: string;
  source: string;
  relevance: number;
}

interface Tool {
  description: string;
  function: (params: any) => Promise<any>;
}

class AugmentedLLM {
  private memory: Memory[] = [];
  private retrievalClient: ChromaClient;
  private tools: Record<string, Tool>;

  constructor() {
    this.retrievalClient = new ChromaClient();
    this.tools = this.initializeTools();
  }

  private initializeTools(): Record<string, Tool> {
    return {
      calculator: {
        description: "Perform mathematical calculations",
        function: this.calculate
      },
      web_search: {
        description: "Search the web for information",
        function: this.searchWeb
      },
      database: {
        description: "Query a database",
        function: this.queryDatabase
      }
    };
  }

  async retrieveRelevantInfo(
    query: string,
    k: number = 5
  ): Promise<RetrievalResult[]> {
    const RETRIEVAL_PROMPT = \`Given this query, what specific information should we look for?
    Query: \${query}
    
    Return as JSON with:
    - search_terms: list of relevant terms
    - filters: any filters to apply\`;

    const searchParams = await JSONLLM<{
      search_terms: string[];
      filters: Record<string, any>;
    }>(RETRIEVAL_PROMPT);

    // Search vector database
    const results = await this.retrievalClient.query({
      queryTexts: [query],
      nResults: k,
      where: searchParams.filters
    });

    return results.documents[0].map((doc: any, i: number) => ({
      content: doc.content,
      source: doc.metadata.source,
      relevance: results.distances[0][i]
    }));
  }

  async determineToolNeeds(
    query: string,
    context: Record<string, any>
  ): Promise<Array<{
    tool_name: string;
    reason: string;
    parameters: Record<string, any>;
  }>> {
    const TOOL_PROMPT = \`Given this query and context, what tools should be used?
    
    Query: \${query}
    Context: \${JSON.stringify(context)}
    Available Tools: \${JSON.stringify(this.tools)}
    
    Return as JSON array of:
    - tool_name: name of tool to use
    - reason: why this tool is needed
    - parameters: parameters to pass to tool\`;

    return await JSONLLM(TOOL_PROMPT);
  }

  async executeTools(
    toolCalls: Array<{
      tool_name: string;
      parameters: Record<string, any>;
    }>
  ): Promise<any[]> {
    return await Promise.all(
      toolCalls.map(call => 
        this.tools[call.tool_name].function(call.parameters)
      )
    );
  }

  private updateMemory(
    content: string,
    memoryType: string,
    metadata: Record<string, any> = {}
  ): void {
    this.memory.push({
      timestamp: new Date(),
      content,
      type: memoryType,
      metadata
    });
  }

  async processQuery(query: string): Promise<string> {
    // Step 1: Retrieve relevant information
    const relevantInfo = await this.retrieveRelevantInfo(query);

    // Step 2: Determine required tools
    const context = {
      relevant_info: relevantInfo,
      recent_memory: this.memory.slice(-5)
    };
    const toolCalls = await this.determineToolNeeds(query, context);

    // Step 3: Execute tools
    const toolResults = await this.executeTools(toolCalls);

    // Step 4: Generate response
    const RESPONSE_PROMPT = \`Generate a response using all available information:
    
    Query: \${query}
    Retrieved Information: \${JSON.stringify(relevantInfo)}
    Tool Results: \${JSON.stringify(toolResults)}
    Recent Memory: \${JSON.stringify(this.memory.slice(-5))}
    
    Synthesize this information into a comprehensive response.\`;

    const response = await runLLM(RESPONSE_PROMPT);

    // Step 5: Update memory
    this.updateMemory(response, "response", { query });

    return response;
  }

  private async calculate(params: any): Promise<number> {
    // Implementation of calculator tool
    return 0;
  }

  private async searchWeb(params: any): Promise<any> {
    // Implementation of web search tool
    return null;
  }

  private async queryDatabase(params: any): Promise<any> {
    // Implementation of database query tool
    return null;
  }
}

// Example usage
async function main() {
  // Initialize augmented LLM
  const llm = new AugmentedLLM();

  // Process a complex query
  const query = \`What was the impact of recent interest rate changes 
  on tech company stock prices? Calculate the average percentage change 
  and identify any significant outliers.\`;

  const response = await llm.processQuery(query);
  console.log("Response:", response);
}

main().catch(console.error);`
};
