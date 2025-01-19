import { Recipe } from './index';

export const promptChaining: Recipe = {
  title: "Prompt Chaining",
  tag: "Workflow",
  description: "Prompt Chaining is a sophisticated workflow that breaks down complex tasks into a series of smaller, manageable steps. Each step in the chain uses the output from the previous step as its input, creating a sequential and refined process.",
  explanation: "In the diagram, you can see how the workflow progresses from left to right. Each block represents an LLM call, with arrows indicating the flow of information. The first LLM generates initial content based on the input. This output is then passed to the second LLM, which refines or builds upon it. Finally, the third LLM produces the final output.",
  useCases: [
    "Content Creation Pipeline: Generate an article outline, expand it into a draft, then polish it into a final version.",
    "Multi-step Problem Solving: Break down a complex math problem, solve each part sequentially, then combine the results.",
    "Language Translation with Refinement: Translate text to an intermediate language, then to the target language, and finally refine for cultural nuances."
  ],
  pythonCode: `from typing import List
from helpers import run_llm 

def serial_chain_workflow(input_query: str, prompt_chain: List[str]) -> List[str]:
    """Run a serial chain of LLM calls to address the \`input_query\` 
    using a list of prompts specified in \`prompt_chain\`.
    """
    response_chain = []
    response = input_query
    for i, prompt in enumerate(prompt_chain):
        print(f"Step {i+1}")
        response = run_llm(
            f"{prompt}\\nInput:\\n{response}", 
            model='meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo'
        )
        response_chain.append(response)
        print(f"{response}\\n")
    return response_chain

# Example
question = "Sally earns $12 an hour for babysitting. Yesterday, she just did 50 minutes of babysitting. How much did she earn?"

prompt_chain = [
    """Given the math problem, ONLY extract any relevant numerical information and how it can be used.""",
    """Given the numberical information extracted, ONLY express the steps you would take to solve the problem.""",
    """Given the steps, express the final answer to the problem."""
]

responses = serial_chain_workflow(question, prompt_chain)
final_answer = responses[-1]`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM } from './helpers';

async function serialChainWorkflow(
  inputQuery: string, 
  promptChain: string[]
): Promise<string[]> {
  const responseChain: string[] = [];
  let response = inputQuery;

  for (let i = 0; i < promptChain.length; i++) {
    console.log(\`Step \${i + 1}\`);
    response = await runLLM({
      prompt: \`\${promptChain[i]}\\nInput:\\n\${response}\`,
      model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo'
    });
    responseChain.push(response);
    console.log(\`\${response}\\n\`);
  }

  return responseChain;
}

// Example
const question = "Sally earns $12 an hour for babysitting. Yesterday, she just did 50 minutes of babysitting. How much did she earn?";

const promptChain = [
  \`Given the math problem, ONLY extract any relevant numerical information and how it can be used.\`,
  \`Given the numberical information extracted, ONLY express the steps you would take to solve the problem.\`,
  \`Given the steps, express the final answer to the problem.\`
];

const responses = await serialChainWorkflow(question, promptChain);
const finalAnswer = responses[responses.length - 1];`
};
