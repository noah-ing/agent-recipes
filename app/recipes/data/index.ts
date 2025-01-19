export interface Recipe {
  title: string;
  tag: string;
  description: string;
  explanation: string;
  useCases: string[];
  pythonCode: string;
  typescriptCode: string;
}

export interface RecipeImage {
  [key: string]: string;
}

// Export workflow images
export const workflowImages: RecipeImage = {
  "prompt-chaining": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/PromptChainingWorkflow_dark_mode.jpg",
  "routing": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/RoutingWorkflow_dark_mode.jpg",
  "coding-agent": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/HighLevelFlowOfCodingAgent_dark_mode.jpg",
  "augmented-llm": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/AugmentedLLM_dark_mode.jpg",
  "parallelization": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/ParallelizationWorkflow_dark_mode.jpg",
  "orchestrator-workers": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/Orchestrator-workersWorkflow_dark_mode.jpg",
  "evaluator-optimizer": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/EvalOptimizerWorkflow_dark_mode.jpg",
  "autonomous-agent": "https://raw.githubusercontent.com/noah-ing/LLM-pics/refs/heads/main/AutonomousAgent_dark_mode.jpg",
};

// Export all recipes
export { promptChaining } from './prompt-chaining';
export { routing } from './routing';
export { parallelization } from './parallelization';
export { orchestratorWorkers } from './orchestrator-workers';
export { evaluatorOptimizer } from './evaluator-optimizer';
export { autonomousAgent } from './autonomous-agent';
export { codingAgent } from './coding-agent';
export { augmentedLlm } from './augmented-llm';
