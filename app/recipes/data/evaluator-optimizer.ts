import { Recipe } from './index';

export const evaluatorOptimizer: Recipe = {
  title: "Evaluator-optimizer",
  tag: "Loops",
  description: "The Evaluator-Optimizer workflow is an iterative process designed to progressively improve outputs through repeated evaluation and refinement. This approach is particularly useful for tasks that require high accuracy or quality.",
  explanation: "The diagram illustrates a cyclical process where an initial solution is evaluated, and if it doesn't meet the criteria, it's passed to an optimizer for refinement. This cycle continues until a satisfactory solution is found or a maximum number of iterations is reached.",
  useCases: [
    "Content Refinement: Iteratively improve written content by checking tone, clarity, and engagement.",
    "Code Optimization: Generate and improve code solutions by evaluating performance and best practices.",
    "Data Analysis Reports: Progressively refine reports by evaluating completeness and clarity of insights."
  ],
  pythonCode: `from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from helpers import run_llm, JSON_llm

class EvaluationResult(BaseModel):
    """Evaluation results with scores and feedback"""
    scores: Dict[str, float]
    feedback: List[str]
    meets_criteria: bool

class OptimizationResult(BaseModel):
    """Optimization result with improved content"""
    content: str
    changes_made: List[str]

async def evaluate_content(
    content: str,
    criteria: Dict[str, str]
) -> EvaluationResult:
    """Evaluate content against specified criteria"""
    
    EVAL_PROMPT = """Evaluate the following content against these criteria:
    {criteria}
    
    For each criterion:
    1. Assign a score (0-10)
    2. Provide specific feedback
    3. Indicate if it meets the minimum threshold (7/10)
    
    Return as JSON with:
    - scores: Dict[str, float]
    - feedback: List[str]
    - meets_criteria: bool (true if all scores >= 7)
    """
    
    evaluation = await JSON_llm(
        EVAL_PROMPT.format(
            criteria="\\n".join(f"- {k}: {v}" for k, v in criteria.items())
        ) + f"\\n\\nContent:\\n{content}",
        EvaluationResult
    )
    
    return evaluation

async def optimize_content(
    content: str,
    evaluation: EvaluationResult
) -> OptimizationResult:
    """Optimize content based on evaluation feedback"""
    
    OPTIMIZE_PROMPT = """Improve the following content based on this feedback:
    {feedback}
    
    Return as JSON with:
    - content: improved version
    - changes_made: list of specific improvements made
    """
    
    optimization = await JSON_llm(
        OPTIMIZE_PROMPT.format(
            feedback="\\n".join(f"- {f}" for f in evaluation.feedback)
        ) + f"\\n\\nOriginal Content:\\n{content}",
        OptimizationResult
    )
    
    return optimization

async def evaluator_optimizer_workflow(
    initial_content: str,
    criteria: Dict[str, str],
    max_iterations: int = 5
) -> str:
    """Iteratively improve content through evaluation and optimization"""
    
    content = initial_content
    iteration = 0
    
    while iteration < max_iterations:
        print(f"\\nIteration {iteration + 1}")
        print("-" * 40)
        
        # Evaluate current content
        evaluation = await evaluate_content(content, criteria)
        
        # Print evaluation results
        print("\\nEvaluation Scores:")
        for criterion, score in evaluation.scores.items():
            print(f"{criterion}: {score}/10")
        
        print("\\nFeedback:")
        for feedback in evaluation.feedback:
            print(f"- {feedback}")
        
        # Check if content meets all criteria
        if evaluation.meets_criteria:
            print("\\nSuccess! All criteria met.")
            break
        
        # Optimize content based on evaluation
        optimization = await optimize_content(content, evaluation)
        content = optimization.content
        
        print("\\nImprovements Made:")
        for change in optimization.changes_made:
            print(f"- {change}")
        
        iteration += 1
    
    return content

# Example usage
async def main():
    blog_post = """
    AI is changing everything. It's making things faster and better. 
    Companies are using it a lot. Some people are worried about it 
    but it's probably fine. Everyone should learn about AI because 
    it's important for the future.
    """
    
    criteria = {
        "clarity": "Ideas should be clearly explained with specific examples",
        "depth": "Content should provide meaningful insights and analysis",
        "engagement": "Writing should be engaging and maintain reader interest",
        "professionalism": "Tone should be professional and authoritative",
        "structure": "Content should be well-organized with logical flow"
    }
    
    final_content = await evaluator_optimizer_workflow(blog_post, criteria)
    print("\\nFinal Optimized Content:\\n", final_content)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM, JSONLLM } from './helpers';

interface EvaluationResult {
  scores: Record<string, number>;
  feedback: string[];
  meets_criteria: boolean;
}

interface OptimizationResult {
  content: string;
  changes_made: string[];
}

async function evaluateContent(
  content: string,
  criteria: Record<string, string>
): Promise<EvaluationResult> {
  const EVAL_PROMPT = \`Evaluate the following content against these criteria:
  \${Object.entries(criteria)
    .map(([k, v]) => \`- \${k}: \${v}\`)
    .join('\\n')}
  
  For each criterion:
  1. Assign a score (0-10)
  2. Provide specific feedback
  3. Indicate if it meets the minimum threshold (7/10)
  
  Return as JSON with:
  - scores: Record<string, number>
  - feedback: string[]
  - meets_criteria: boolean (true if all scores >= 7)
  \`;

  return await JSONLLM<EvaluationResult>(
    \`\${EVAL_PROMPT}\\n\\nContent:\\n\${content}\`
  );
}

async function optimizeContent(
  content: string,
  evaluation: EvaluationResult
): Promise<OptimizationResult> {
  const OPTIMIZE_PROMPT = \`Improve the following content based on this feedback:
  \${evaluation.feedback.map(f => \`- \${f}\`).join('\\n')}
  
  Return as JSON with:
  - content: improved version
  - changes_made: list of specific improvements made
  \`;

  return await JSONLLM<OptimizationResult>(
    \`\${OPTIMIZE_PROMPT}\\n\\nOriginal Content:\\n\${content}\`
  );
}

async function evaluatorOptimizerWorkflow(
  initialContent: string,
  criteria: Record<string, string>,
  maxIterations: number = 5
): Promise<string> {
  let content = initialContent;
  let iteration = 0;

  while (iteration < maxIterations) {
    console.log(\`\\nIteration \${iteration + 1}\`);
    console.log("-".repeat(40));

    // Evaluate current content
    const evaluation = await evaluateContent(content, criteria);

    // Print evaluation results
    console.log("\\nEvaluation Scores:");
    Object.entries(evaluation.scores).forEach(([criterion, score]) => {
      console.log(\`\${criterion}: \${score}/10\`);
    });

    console.log("\\nFeedback:");
    evaluation.feedback.forEach(feedback => {
      console.log(\`- \${feedback}\`);
    });

    // Check if content meets all criteria
    if (evaluation.meets_criteria) {
      console.log("\\nSuccess! All criteria met.");
      break;
    }

    // Optimize content based on evaluation
    const optimization = await optimizeContent(content, evaluation);
    content = optimization.content;

    console.log("\\nImprovements Made:");
    optimization.changes_made.forEach(change => {
      console.log(\`- \${change}\`);
    });

    iteration++;
  }

  return content;
}

// Example usage
async function main() {
  const blogPost = \`
    AI is changing everything. It's making things faster and better. 
    Companies are using it a lot. Some people are worried about it 
    but it's probably fine. Everyone should learn about AI because 
    it's important for the future.
  \`;

  const criteria = {
    clarity: "Ideas should be clearly explained with specific examples",
    depth: "Content should provide meaningful insights and analysis",
    engagement: "Writing should be engaging and maintain reader interest",
    professionalism: "Tone should be professional and authoritative",
    structure: "Content should be well-organized with logical flow"
  };

  const finalContent = await evaluatorOptimizerWorkflow(blogPost, criteria);
  console.log("\\nFinal Optimized Content:\\n", finalContent);
}

main().catch(console.error);`
};
