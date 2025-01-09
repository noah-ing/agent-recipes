import { WorkflowCard } from "@/components/workflow-card"
import { AnimatedWorkflowCard } from "@/components/animated-workflow-card"

export default function Page() {
  const workflows = [
    {
      slug: "prompt-chaining",
      title: "Prompt Chaining",
      description: "A workflow where the output of one LLM call becomes the input for the next. This sequential design allows for structured reasoning and step-by-step task completion.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/PromptChainingWorkflow.jpg",
      tag: "Workflow"
    },
    {
      slug: "routing",
      title: "Routing",
      description: "A low-latency workflow where inputs are dynamically routed to the most appropriate LLM instance or configuration, optimizing efficiency and specialization.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/RoutingWorkflow.jpg",
      tag: "Low Latency"
    },
    {
      slug: "coding-agent",
      title: "Coding Agent",
      description: "A sophisticated workflow for AI-powered code generation with built-in clarification loops and test-driven development practices.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/HighLevelFlowOfCodingAgent.jpg",
      tag: "Agent"
    },
    {
      slug: "augmented-llm",
      title: "Augmented LLM",
      description: "An enhanced LLM architecture that combines retrieval, tools, and memory systems to extend the model's capabilities beyond its training data.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/AugmentedLLM.jpg",
      tag: "Architecture"
    },
    {
      slug: "parallelization",
      title: "Parallelization",
      description: "A workflow that distributes tasks across multiple LLM calls simultaneously, aggregating results to handle complex or large-scale operations efficiently.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/ParallelizationWorkflow.jpg",
      tag: "Workflow"
    },
    {
      slug: "orchestrator-workers",
      title: "Orchestrator-workers",
      description: "A workflow with a central orchestrator directing multiple worker LLMs to perform subtasks, synthesizing their outputs for complex, coordinated operations.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/Orchestrator-workersWorkflow.jpg",
      tag: "Workflow"
    },
    {
      slug: "evaluator-optimizer",
      title: "Evaluator-optimizer",
      description: "A feedback loop workflow where LLM-generated outputs are evaluated, refined, and optimized iteratively to improve accuracy and relevance.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/EvalOptimizerWorkflow.jpg",
      tag: "Loops"
    },
    {
      slug: "autonomous-agent",
      title: "Autonomous Agent",
      description: "An agent-based workflow where LLMs act autonomously within a loop, interacting with their environment and receiving feedback to refine their actions and decisions.",
      imageSrc: "https://raw.githubusercontent.com/noah-ing/LLM-pics/de75237fa3870fe0e798c3c6543612d513138e07/AutonomousAgent.jpg",
      tag: "Agent"
    }
  ]

  return (
    <div className="container py-10">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold font-mono">Explore Agent Recipes</h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Explore common agent recipes with ready to copy code to improve your LLM applications.{" "}
          <span className="text-muted-foreground/60">
            These agent recipes are inspired by{" "}
            <a 
              href="https://www.anthropic.com/research/building-effective-agents" 
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic's article
            </a>
            .
          </span>
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {workflows.map((workflow) => (
          <AnimatedWorkflowCard key={workflow.slug} {...workflow} />
        ))}
      </div>
    </div>
  )
}

