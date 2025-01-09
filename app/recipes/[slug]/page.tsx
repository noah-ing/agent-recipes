"use client"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { notFound } from "next/navigation"

const workflowImages = {
  "prompt-chaining": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/PromptChainingWorkflow.jpg",
  "routing": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/RoutingWorkflow.jpg",
  "coding-agent": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/HighLevelFlowOfCodingAgent.jpg",
  "augmented-llm": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/AugmentedLLM.jpg",
  "parallelization": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/ParallelizationWorkflow.jpg",
  "orchestrator-workers": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/Orchestrator-workersWorkflow.jpg",
  "evaluator-optimizer": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/EvalOptimizerWorkflow.jpg",
  "autonomous-agent": "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/AutonomousAgent.jpg",
} as const;

const workflows = {
  "prompt-chaining": {
    title: "Prompt Chaining",
    tag: "Workflow",
    description: "Prompt Chaining is a sophisticated workflow that breaks down complex tasks into a series of smaller, manageable steps. Each step in the chain uses the output from the previous step as its input, creating a sequential and refined process.",
    explanation: "In the diagram, you can see how the workflow progresses from left to right. Each block represents an LLM call, with arrows indicating the flow of information. The first LLM generates initial content based on the input. This output is then passed to the second LLM, which refines or builds upon it. Finally, the third LLM produces the final output.",
    useCases: [
      "Content Creation Pipeline: Generate an article outline, expand it into a draft, then polish it into a final version.",
      "Multi-step Problem Solving: Break down a complex math problem, solve each part sequentially, then combine the results.",
      "Language Translation with Refinement: Translate text to an intermediate language, then to the target language, and finally refine for cultural nuances."
    ],
    pythonCode: `def prompt_chaining_workflow(input_data: str) -> str:
    # First LLM call generates initial content
    step1_output = llm_call_1(input_data)
    if not validate_output(step1_output):
        raise ValueError("Step 1 validation failed.")
    
    # Second LLM call refines the content
    step2_output = llm_call_2(step1_output)
    if not validate_output(step2_output):
        raise ValueError("Step 2 validation failed.")
    
    # Final LLM call produces the result
    final_output = llm_call_3(step2_output)
    return final_output`,
    typescriptCode: `export async function promptChainingWorkflow(
  inputData: string
): Promise<string> {
  // First LLM call generates initial content
  const step1Output = await llmCall1(inputData);
  if (!validateOutput(step1Output)) throw new Error("Step 1 invalid.");

  // Second LLM call refines the content
  const step2Output = await llmCall2(step1Output);
  if (!validateOutput(step2Output)) throw new Error("Step 2 invalid.");

  // Final LLM call produces the result
  return await llmCall3(step2Output);
}`
  },
  "routing": {
    title: "Routing",
    tag: "Low Latency",
    description: "Routing is an efficient workflow designed to direct inputs to the most appropriate LLM or processing pipeline based on the nature of the task. This approach optimizes performance by ensuring that each query is handled by the most suitable model or process.",
    explanation: "The diagram illustrates the routing process. At the top, we have the input, which is first analyzed by a classifier. Based on the classification result, the input is then directed to one of several specialized LLMs or processes. Each path is optimized for a specific type of task, ensuring efficient and accurate processing.",
    useCases: [
      "Customer Support Triage: Automatically categorize and route customer inquiries to the appropriate department.",
      "Multi-lingual Processing: Route text to language-specific models for translation or analysis based on detected language.",
      "Complexity-based Model Selection: Direct simple queries to faster, smaller models and complex queries to more powerful models."
    ],
    pythonCode: `def routing_workflow(query: str) -> str:
    # Determine the type of input
    category = classify_input(query)
    
    # Route to appropriate model or process
    if category == "sentiment":
        return sentiment_model(query)
    elif category == "translation":
        return translation_model(query)
    elif category == "technical":
        return technical_support_model(query)
    else:
        return general_model(query)`,
    typescriptCode: `export async function routingWorkflow(query: string): Promise<string> {
  // Determine the type of input
  const category = await classifyInput(query);
  
  // Route to appropriate model or process
  switch (category) {
    case "sentiment":
      return sentimentModel(query);
    case "translation":
      return translationModel(query);
    case "technical":
      return technicalSupportModel(query);
    default:
      return generalModel(query);
  }
}`
  },
  "parallelization": {
    title: "Parallelization",
    tag: "Workflow",
    description: "Parallelization is a powerful workflow that leverages concurrent processing to handle multiple subtasks or aspects of a problem simultaneously. This approach significantly improves efficiency, especially for complex tasks that can be broken down into independent components.",
    explanation: "The diagram shows how a single input is distributed to multiple LLM processes that operate independently and simultaneously on different aspects of the task. The results from these parallel processes are then aggregated to produce a final, comprehensive output.",
    useCases: [
      "Multi-aspect Content Analysis: Simultaneously analyze sentiment, extract key entities, and summarize text.",
      "Ensemble Learning: Generate multiple solutions using different models or prompts, then combine results.",
      "Parallel Data Processing: Process large datasets by dividing them into chunks and analyzing concurrently."
    ],
    pythonCode: `import asyncio

async def parallelization_workflow(text: str) -> dict:
    # Define multiple tasks to run concurrently
    tasks = [
        analyze_sentiment(text),
        summarize_text(text),
        extract_entities(text),
        classify_topic(text)
    ]
    
    # Execute all tasks concurrently
    sentiment, summary, entities, topic = await asyncio.gather(*tasks)
    
    # Aggregate and return results
    return {
        "sentiment": sentiment,
        "summary": summary,
        "entities": entities,
        "topic": topic
    }`,
    typescriptCode: `export async function parallelizationWorkflow(
  input: string
): Promise<{
  sentiment: string;
  summary: string;
  entities: string[];
  topic: string;
}> {
  // Execute multiple tasks concurrently
  const [sentiment, summary, entities, topic] = await Promise.all([
    analyzeSentiment(input),
    summarizeText(input),
    extractEntities(input),
    classifyTopic(input)
  ]);

  // Return aggregated results
  return { sentiment, summary, entities, topic };
}`
  },
  "orchestrator-workers": {
    title: "Orchestrator-workers",
    tag: "Workflow",
    description: "The Orchestrator-Workers pattern is a hierarchical workflow where a central 'orchestrator' LLM oversees and coordinates multiple 'worker' LLMs. This approach is particularly effective for complex, multi-step tasks that require different types of expertise or processing.",
    explanation: "In the diagram, the orchestrator receives the initial input and task, analyzes the problem, breaks it down into subtasks, and delegates these to specialized worker LLMs. Each worker focuses on its assigned subtask and returns its results to the orchestrator, which then synthesizes these individual results into a final output.",
    useCases: [
      "Complex Research Tasks: Orchestrator breaks down research questions and coordinates data collection, analysis, and summary tasks.",
      "Multi-component Software Development: Plan architecture and delegate frontend, backend, and database design tasks.",
      "Interdisciplinary Problem Solving: Coordinate between workers specializing in different domains for comprehensive solutions."
    ],
    pythonCode: `def orchestrator_workers_workflow(task: str) -> str:
    # Orchestrator breaks down the task
    subtasks = orchestrator_breakdown(task)
    
    # Assign subtasks to workers and collect results
    results = []
    for subtask in subtasks:
        worker = select_worker(subtask)
        result = worker.perform_subtask(subtask)
        results.append(result)
    
    # Orchestrator synthesizes final result
    return orchestrator_synthesize(results)`,
    typescriptCode: `export async function orchestratorWorkersWorkflow(
  task: string
): Promise<string> {
  // Orchestrator breaks down the task
  const subtasks = orchestratorBreakdown(task);
  
  // Assign subtasks to workers and collect results
  const results = await Promise.all(
    subtasks.map(async (subtask) => {
      const worker = selectWorker(subtask);
      return await worker.performSubtask(subtask);
    })
  );
  
  // Orchestrator synthesizes final result
  return orchestratorSynthesize(results);
}`
  },
  "evaluator-optimizer": {
    title: "Evaluator-optimizer",
    tag: "Loops",
    description: "The Evaluator-Optimizer workflow is an iterative process designed to progressively improve outputs through repeated evaluation and refinement. This approach is particularly useful for tasks that require high accuracy or quality.",
    explanation: "The diagram illustrates a cyclical process where an initial solution is evaluated, and if it doesn't meet the criteria, it's passed to an optimizer for refinement. This cycle continues until a satisfactory solution is found or a maximum number of iterations is reached.",
    useCases: [
      "Content Refinement: Iteratively improve written content by checking tone, clarity, and engagement.",
      "Code Optimization: Generate and improve code solutions by evaluating performance and best practices.",
      "Data Analysis Reports: Progressively refine reports by evaluating completeness and clarity of insights."
    ],
    pythonCode: `def evaluator_optimizer_workflow(prompt: str, max_iterations: int = 5) -> str:
    solution = generate_initial_solution(prompt)
    
    for _ in range(max_iterations):
        evaluation = evaluate_solution(solution)
        
        if evaluation.is_satisfactory():
            return solution
        
        feedback = evaluation.get_feedback()
        solution = optimize_solution(solution, feedback)
    
    return solution  # Return best solution after max iterations`,
    typescriptCode: `export async function evaluatorOptimizerWorkflow(
  prompt: string,
  maxIterations: number = 5
): Promise<string> {
  let solution = await generateInitialSolution(prompt);
  
  for (let i = 0; i < maxIterations; i++) {
    const evaluation = await evaluateSolution(solution);
    
    if (evaluation.isSatisfactory()) {
      return solution;
    }
    
    const feedback = evaluation.getFeedback();
    solution = await optimizeSolution(solution, feedback);
  }
  
  return solution;  // Return best solution after max iterations
}`
  },
  "autonomous-agent": {
    title: "Autonomous Agent",
    tag: "Agent",
    description: "The Autonomous Agent workflow represents a highly flexible and adaptable approach to problem-solving. In this model, an LLM-based agent operates with a degree of independence, making decisions, taking actions, and learning from outcomes to achieve a given goal.",
    explanation: "The diagram illustrates a cyclical process of planning, execution, and learning. The agent determines the next best action based on its current understanding, carries out this action, collects feedback, and updates its knowledge or strategy based on these observations.",
    useCases: [
      "Adaptive Customer Support: Handle diverse queries, learning from each interaction to improve responses.",
      "Autonomous Research Assistant: Break down research tasks, search for information, and refine approaches.",
      "Self-Improving Code Generator: Write, test, and refactor code based on specifications and performance metrics."
    ],
    pythonCode: `class AutonomousAgent:
    def __init__(self, goal: str):
        self.goal = goal
        self.knowledge = {}
        self.tools = self.initialize_tools()

    def run(self, max_steps: int = 10):
        for _ in range(max_steps):
            plan = self.plan_action()
            result = self.execute_action(plan)
            self.observe_result(result)
            self.learn_from_result(result)
            
            if self.goal_achieved():
                break
        
        return self.summarize_results()`,
    typescriptCode: `export class AutonomousAgent {
  private goal: string;
  private knowledge: Record<string, any> = {};
  private tools: Record<string, Tool>;

  constructor(goal: string) {
    this.goal = goal;
    this.tools = this.initializeTools();
  }

  async run(maxSteps: number = 10): Promise<string> {
    for (let i = 0; i < maxSteps; i++) {
      const plan = await this.planAction();
      const result = await this.executeAction(plan);
      await this.observeResult(result);
      await this.learnFromResult(result);
      
      if (await this.goalAchieved()) {
        break;
      }
    }
    
    return this.summarizeResults();
  }
}`
  },
  "coding-agent": {
    title: "Coding Agent",
    tag: "Agent",
    description: "A sophisticated workflow for AI-powered code generation that implements a robust process of task clarification, code writing, and test-driven development.",
    explanation: "The diagram illustrates a comprehensive coding agent workflow with two main loops. The first loop ('Until tasks clear') handles task clarification between the human and LLM through the interface. The second loop ('Until tests pass') manages the code generation and testing process, where the LLM interacts with the environment to write, test, and refine code until it meets the specified requirements.",
    useCases: [
      "Automated Code Generation: Generate code based on natural language descriptions with built-in testing and validation.",
      "Code Refactoring: Analyze existing code and suggest improvements while maintaining functionality.",
      "Test-Driven Development: Generate test cases and implementation code iteratively.",
    ],
    pythonCode: `class CodingAgent:
    def __init__(self):
        self.interface = Interface()
        self.llm = LLM()
        self.environment = Environment()
        
    async def process_query(self, initial_query: str) -> str:
        # Task clarification loop
        query = initial_query
        while not self.interface.tasks_clear():
            clarification = await self.llm.clarify(query)
            refined_query = await self.interface.refine(clarification)
            query = refined_query
            
        # Code generation and testing loop
        context = self.interface.get_context()
        while True:
            # Search for relevant files
            files = await self.environment.search_files(context)
            
            # Generate and write code
            code = await self.llm.write_code(context, files)
            status = await self.environment.write_code(code)
            
            # Run tests
            test_results = await self.environment.run_tests()
            if test_results.passed:
                break
                
            # Update context with test results
            context = self.llm.update_context(test_results)
        
        return code`,
    typescriptCode: `class CodingAgent {
  private interface: Interface;
  private llm: LLM;
  private environment: Environment;

  constructor() {
    this.interface = new Interface();
    this.llm = new LLM();
    this.environment = new Environment();
  }

  async processQuery(initialQuery: string): Promise<string> {
    // Task clarification loop
    let query = initialQuery;
    while (!this.interface.tasksClear()) {
      const clarification = await this.llm.clarify(query);
      const refinedQuery = await this.interface.refine(clarification);
      query = refinedQuery;
    }

    // Code generation and testing loop
    let context = this.interface.getContext();
    while (true) {
      // Search for relevant files
      const files = await this.environment.searchFiles(context);

      // Generate and write code
      const code = await this.llm.writeCode(context, files);
      const status = await this.environment.writeCode(code);

      // Run tests
      const testResults = await this.environment.runTests();
      if (testResults.passed) {
        break;
      }

      // Update context with test results
      context = this.llm.updateContext(testResults);
    }

    return code;
  }
}`
  },
  "augmented-llm": {
    title: "Augmented LLM",
    tag: "Architecture",
    description: "An enhanced LLM architecture that extends the model's capabilities through integration with external retrieval systems, tools, and memory components.",
    explanation: "The diagram shows how an LLM can be augmented with three key components: a retrieval system for accessing external knowledge, tools for performing specific actions, and a memory system for maintaining context. These components interact bidirectionally with the LLM, allowing it to query information, use tools, and maintain state across interactions.",
    useCases: [
      "Knowledge-Intensive Tasks: Augment LLM responses with real-time information from external sources.",
      "Tool-Using Agents: Enable LLMs to interact with external tools and APIs to perform specific actions.",
      "Stateful Applications: Maintain conversation history and context across multiple interactions.",
    ],
    pythonCode: `class AugmentedLLM:
    def __init__(self):
        self.llm = LLM()
        self.retrieval = RetrievalSystem()
        self.tools = ToolRegistry()
        self.memory = MemorySystem()
        
    async def process(self, input_query: str) -> str:
        # Initialize conversation context
        context = self.memory.get_context()
        
        # Query relevant information
        retrieved_info = await self.retrieval.search(
            query=input_query,
            context=context
        )
        
        # Determine required tools
        tool_calls = await self.llm.plan_tool_usage(
            query=input_query,
            context=context,
            retrieved_info=retrieved_info
        )
        
        # Execute tool calls
        tool_results = []
        for tool_call in tool_calls:
            result = await self.tools.execute(
                tool_name=tool_call.name,
                params=tool_call.params
            )
            tool_results.append(result)
            
        # Generate response
        response = await self.llm.generate_response(
            query=input_query,
            context=context,
            retrieved_info=retrieved_info,
            tool_results=tool_results
        )
        
        # Update memory
        self.memory.update(
            query=input_query,
            response=response,
            context=context
        )
        
        return response`,
    typescriptCode: `class AugmentedLLM {
  private llm: LLM;
  private retrieval: RetrievalSystem;
  private tools: ToolRegistry;
  private memory: MemorySystem;

  constructor() {
    this.llm = new LLM();
    this.retrieval = new RetrievalSystem();
    this.tools = new ToolRegistry();
    this.memory = new MemorySystem();
  }

  async process(inputQuery: string): Promise<string> {
    // Initialize conversation context
    const context = this.memory.getContext();

    // Query relevant information
    const retrievedInfo = await this.retrieval.search({
      query: inputQuery,
      context
    });

    // Determine required tools
    const toolCalls = await this.llm.planToolUsage({
      query: inputQuery,
      context,
      retrievedInfo
    });

    // Execute tool calls
    const toolResults = await Promise.all(
      toolCalls.map(toolCall =>
        this.tools.execute({
          toolName: toolCall.name,
          params: toolCall.params
        })
      )
    );

    // Generate response
    const response = await this.llm.generateResponse({
      query: inputQuery,
      context,
      retrievedInfo,
      toolResults
    });

    // Update memory
    this.memory.update({
      query: inputQuery,
      response,
      context
    });

    return response;
  }
}`
  }
} as const;

type WorkflowSlug = keyof typeof workflows;

interface PageProps {
  params: {
    slug: WorkflowSlug
  }
}

export default function Page({ params }: PageProps) {
  // Get the workflow data based on the slug
  const workflow = workflows[params.slug];
  
  // If the workflow doesn't exist, show 404
  if (!workflow) {
    notFound();
  }

  // Get the image source for the workflow
  const imageSrc = workflowImages[params.slug];

  return (
    <div className="container max-w-4xl py-10">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to recipes
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-mono">{workflow.title}</h1>
            <Badge variant="secondary" className="font-mono">
              {workflow.tag}
            </Badge>
          </div>
          <p className="text-muted-foreground">{workflow.description}</p>
        </div>

        <div className="overflow-hidden rounded-lg border bg-muted/50">
          <Image
            src={imageSrc}
            alt={`${workflow.title} workflow diagram`}
            width={800}
            height={400}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-mono">Diagram Explanation</h2>
          <p className="text-muted-foreground">{workflow.explanation}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-mono">Use Cases</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {workflow.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>

        <CodeBlock
          python={workflow.pythonCode}
          typescript={workflow.typescriptCode}
        />
      </div>
    </div>
  )
}

