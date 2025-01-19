import { Recipe } from './index';

export const orchestratorWorkers: Recipe = {
  title: "Orchestrator-workers",
  tag: "Workflow",
  description: "The Orchestrator-Workers pattern is a hierarchical workflow where a central 'orchestrator' LLM oversees and coordinates multiple 'worker' LLMs. This approach is particularly effective for complex, multi-step tasks that require different types of expertise or processing.",
  explanation: "In the diagram, the orchestrator receives the initial input and task, analyzes the problem, breaks it down into subtasks, and delegates these to specialized worker LLMs. Each worker focuses on its assigned subtask and returns its results to the orchestrator, which then synthesizes these individual results into a final output.",
  useCases: [
    "Complex Research Tasks: Orchestrator breaks down research questions and coordinates data collection, analysis, and summary tasks.",
    "Multi-component Software Development: Plan architecture and delegate frontend, backend, and database design tasks.",
    "Interdisciplinary Problem Solving: Coordinate between workers specializing in different domains for comprehensive solutions."
  ],
  pythonCode: `from typing import List, Dict, Any
from pydantic import BaseModel
from helpers import run_llm, JSON_llm

class Task(BaseModel):
    """Represents a subtask in the workflow"""
    description: str
    worker: str
    priority: int
    dependencies: List[int] = []

class WorkerResult(BaseModel):
    """Represents the result from a worker"""
    task_id: int
    result: str
    status: str

async def orchestrator_workflow(project_request: str) -> str:
    """Orchestrate multiple LLM workers to complete a complex project."""
    
    # Step 1: Orchestrator analyzes and breaks down the project
    PLANNING_PROMPT = """Break down this project request into specific tasks.
    For each task specify:
    1. Task description
    2. Which worker should handle it (choose from: researcher, architect, developer, reviewer)
    3. Priority (1-5, 1 being highest)
    4. Dependencies (task IDs that must be completed first)
    Return as JSON array of tasks."""

    tasks = JSON_llm(
        f"{PLANNING_PROMPT}\\nProject: {project_request}",
        List[Task]
    )
    
    # Sort tasks by priority and dependencies
    tasks.sort(key=lambda x: (len(x.dependencies), x.priority))
    
    # Step 2: Execute tasks through workers
    results: Dict[int, WorkerResult] = {}
    
    for i, task in enumerate(tasks):
        # Wait for dependencies to complete
        for dep in task.dependencies:
            if dep not in results or results[dep].status != "completed":
                continue
                
        # Select appropriate worker prompt based on role
        worker_prompts = {
            "researcher": "Research and provide information about:",
            "architect": "Design the architecture for:",
            "developer": "Write code to implement:",
            "reviewer": "Review and provide feedback on:"
        }
        
        # Execute worker task
        worker_result = await run_llm(
            f"{worker_prompts[task.worker]}\\n{task.description}\\n\\n" +
            "Previous relevant results:\\n" +
            "\\n".join([
                f"Task {dep}: {results[dep].result}"
                for dep in task.dependencies
                if dep in results
            ]),
            model=f"specialized/{task.worker}-llm"
        )
        
        # Store result
        results[i] = WorkerResult(
            task_id=i,
            result=worker_result,
            status="completed"
        )
    
    # Step 3: Orchestrator synthesizes final result
    SYNTHESIS_PROMPT = """Synthesize the results of all completed tasks into a 
    coherent final deliverable. Ensure all components work together and meet the 
    original project requirements."""
    
    final_result = await run_llm(
        f"{SYNTHESIS_PROMPT}\\n\\nProject Request: {project_request}\\n\\n" +
        "Task Results:\\n" +
        "\\n".join([
            f"Task {i}: {result.result}"
            for i, result in results.items()
        ])
    )
    
    return final_result

# Example usage
async def main():
    project = """
    Create a web application for task management with the following requirements:
    1. User authentication
    2. CRUD operations for tasks
    3. Task categorization and filtering
    4. Responsive design
    5. Data persistence
    """
    
    result = await orchestrator_workflow(project)
    print("Final Project Deliverable:\\n", result)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM, JSONLLM } from './helpers';

interface Task {
  description: string;
  worker: string;
  priority: number;
  dependencies: number[];
}

interface WorkerResult {
  task_id: number;
  result: string;
  status: string;
}

async function orchestratorWorkflow(projectRequest: string): Promise<string> {
  // Step 1: Orchestrator analyzes and breaks down the project
  const PLANNING_PROMPT = \`Break down this project request into specific tasks.
  For each task specify:
  1. Task description
  2. Which worker should handle it (choose from: researcher, architect, developer, reviewer)
  3. Priority (1-5, 1 being highest)
  4. Dependencies (task IDs that must be completed first)
  Return as JSON array of tasks.\`;

  const tasks = await JSONLLM<Task[]>(
    \`\${PLANNING_PROMPT}\\nProject: \${projectRequest}\`
  );

  // Sort tasks by priority and dependencies
  tasks.sort((a, b) => 
    (a.dependencies.length - b.dependencies.length) || (a.priority - b.priority)
  );

  // Step 2: Execute tasks through workers
  const results: Record<number, WorkerResult> = {};

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // Wait for dependencies to complete
    const dependenciesComplete = task.dependencies.every(
      dep => dep in results && results[dep].status === "completed"
    );
    if (!dependenciesComplete) continue;

    // Select appropriate worker prompt based on role
    const workerPrompts: Record<string, string> = {
      researcher: "Research and provide information about:",
      architect: "Design the architecture for:",
      developer: "Write code to implement:",
      reviewer: "Review and provide feedback on:"
    };

    // Execute worker task
    const workerResult = await runLLM({
      prompt: \`\${workerPrompts[task.worker]}\\n\${task.description}\\n\\n\` +
        "Previous relevant results:\\n" +
        task.dependencies
          .filter(dep => dep in results)
          .map(dep => \`Task \${dep}: \${results[dep].result}\`)
          .join("\\n"),
      model: \`specialized/\${task.worker}-llm\`
    });

    // Store result
    results[i] = {
      task_id: i,
      result: workerResult,
      status: "completed"
    };
  }

  // Step 3: Orchestrator synthesizes final result
  const SYNTHESIS_PROMPT = \`Synthesize the results of all completed tasks into a 
  coherent final deliverable. Ensure all components work together and meet the 
  original project requirements.\`;

  const finalResult = await runLLM({
    prompt: \`\${SYNTHESIS_PROMPT}\\n\\nProject Request: \${projectRequest}\\n\\n\` +
      "Task Results:\\n" +
      Object.entries(results)
        .map(([i, result]) => \`Task \${i}: \${result.result}\`)
        .join("\\n")
  });

  return finalResult;
}

// Example usage
async function main() {
  const project = \`
    Create a web application for task management with the following requirements:
    1. User authentication
    2. CRUD operations for tasks
    3. Task categorization and filtering
    4. Responsive design
    5. Data persistence
  \`;

  const result = await orchestratorWorkflow(project);
  console.log("Final Project Deliverable:\\n", result);
}

main().catch(console.error);`
};
