import { Recipe } from './index';

export const parallelization: Recipe = {
  title: "Parallelization",
  tag: "Workflow",
  description: "Parallelization is a powerful workflow that leverages concurrent processing to handle multiple subtasks or aspects of a problem simultaneously. This approach significantly improves efficiency, especially for complex tasks that can be broken down into independent components.",
  explanation: "The diagram shows how a single input is distributed to multiple LLM processes that operate independently and simultaneously on different aspects of the task. The results from these parallel processes are then aggregated to produce a final, comprehensive output.",
  useCases: [
    "Multi-aspect Content Analysis: Simultaneously analyze sentiment, extract key entities, and summarize text.",
    "Ensemble Learning: Generate multiple solutions using different models or prompts, then combine results.",
    "Parallel Data Processing: Process large datasets by dividing them into chunks and analyzing concurrently."
  ],
  pythonCode: `from typing import List, Dict, Any
import asyncio
from helpers import run_llm

async def analyze_content(text: str, aspect: str, prompt: str) -> Dict[str, Any]:
    """Analyze content for a specific aspect using an LLM."""
    response = await run_llm(
        f"{prompt}\\nContent: {text}",
        model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"
    )
    return {aspect: response}

async def parallel_analysis_workflow(content: str) -> Dict[str, Any]:
    """Analyze content in parallel across multiple dimensions."""
    analysis_tasks = {
        "sentiment": "Analyze ONLY the sentiment of this content. Rate it from 1-10 and explain why.",
        "key_points": "Extract ONLY the 3-5 most important key points from this content.",
        "audience": "Identify ONLY the target audience for this content and explain why.",
        "style": "Analyze ONLY the writing style and tone of this content.",
        "suggestions": "Provide ONLY 2-3 specific suggestions to improve this content."
    }
    
    # Create tasks for parallel execution
    tasks = [
        analyze_content(content, aspect, prompt)
        for aspect, prompt in analysis_tasks.items()
    ]
    
    # Execute all analysis tasks in parallel
    results = await asyncio.gather(*tasks)
    
    # Combine results into a single dictionary
    combined_analysis = {}
    for result in results:
        combined_analysis.update(result)
    
    return combined_analysis

# Example usage
async def main():
    blog_post = """
    Artificial Intelligence has transformed the way we work and live. From virtual 
    assistants to autonomous vehicles, AI technologies are becoming increasingly 
    prevalent in our daily lives. While these advancements offer numerous benefits, 
    they also raise important ethical considerations that society must address.
    """
    
    print("Starting parallel content analysis...")
    analysis = await parallel_analysis_workflow(blog_post)
    
    # Print results in a structured format
    for aspect, result in analysis.items():
        print(f"\\n{aspect.upper()}:")
        print("-" * 40)
        print(result)

if __name__ == "__main__":
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM } from './helpers';

interface AnalysisResult {
  [key: string]: string;
}

async function analyzeContent(
  text: string,
  aspect: string,
  prompt: string
): Promise<AnalysisResult> {
  const response = await runLLM({
    prompt: \`\${prompt}\\nContent: \${text}\`,
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"
  });
  return { [aspect]: response };
}

async function parallelAnalysisWorkflow(
  content: string
): Promise<AnalysisResult> {
  const analysisTasks = {
    sentiment: "Analyze ONLY the sentiment of this content. Rate it from 1-10 and explain why.",
    key_points: "Extract ONLY the 3-5 most important key points from this content.",
    audience: "Identify ONLY the target audience for this content and explain why.",
    style: "Analyze ONLY the writing style and tone of this content.",
    suggestions: "Provide ONLY 2-3 specific suggestions to improve this content."
  };

  // Create and execute all analysis tasks in parallel
  const tasks = Object.entries(analysisTasks).map(([aspect, prompt]) =>
    analyzeContent(content, aspect, prompt)
  );

  // Wait for all tasks to complete
  const results = await Promise.all(tasks);

  // Combine results into a single object
  return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}

// Example usage
async function main() {
  const blogPost = \`
    Artificial Intelligence has transformed the way we work and live. From virtual 
    assistants to autonomous vehicles, AI technologies are becoming increasingly 
    prevalent in our daily lives. While these advancements offer numerous benefits, 
    they also raise important ethical considerations that society must address.
  \`;

  console.log("Starting parallel content analysis...");
  const analysis = await parallelAnalysisWorkflow(blogPost);

  // Print results in a structured format
  Object.entries(analysis).forEach(([aspect, result]) => {
    console.log(\`\\n\${aspect.toUpperCase()}:\`);
    console.log("-".repeat(40));
    console.log(result);
  });
}

main().catch(console.error);`
};
