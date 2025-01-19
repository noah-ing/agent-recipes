import { Recipe } from './index';

export const autonomousAgent: Recipe = {
  title: "Autonomous Agent",
  tag: "Agent",
  description: "The Autonomous Agent workflow represents a highly flexible and adaptable approach to problem-solving. In this model, an LLM-based agent operates with a degree of independence, making decisions, taking actions, and learning from outcomes to achieve a given goal.",
  explanation: "The diagram illustrates a cyclical process of planning, execution, and learning. The agent determines the next best action based on its current understanding, carries out this action, collects feedback, and updates its knowledge or strategy based on these observations.",
  useCases: [
    "Adaptive Customer Support: Handle diverse queries, learning from each interaction to improve responses.",
    "Autonomous Research Assistant: Break down research tasks, search for information, and refine approaches.",
    "Self-Improving Code Generator: Write, test, and refactor code based on specifications and performance metrics."
  ],
  pythonCode: `from typing import Dict, List, Any, Optional
from pydantic import BaseModel
from datetime import datetime
from helpers import run_llm, JSON_llm, execute_tool

class Action(BaseModel):
    """Represents a planned action"""
    tool: str
    params: Dict[str, Any]
    reason: str
    expected_outcome: str

class Observation(BaseModel):
    """Represents an observation from executing an action"""
    action: Action
    result: Any
    success: bool
    timestamp: datetime

class AgentState(BaseModel):
    """Represents the agent's current state"""
    goal: str
    context: Dict[str, Any]
    observations: List[Observation]
    learned_patterns: Dict[str, Any]

class AutonomousAgent:
    def __init__(self, goal: str, available_tools: Dict[str, Any]):
        self.state = AgentState(
            goal=goal,
            context={},
            observations=[],
            learned_patterns={}
        )
        self.tools = available_tools

    async def plan_next_action(self) -> Optional[Action]:
        """Plan the next action based on current state"""
        PLANNING_PROMPT = """Given the current state and goal, determine the next best action.
        
        Goal: {goal}
        Context: {context}
        Recent Observations: {observations}
        Learned Patterns: {patterns}
        Available Tools: {tools}
        
        Return as JSON with:
        - tool: name of tool to use
        - params: parameters for the tool
        - reason: why this action was chosen
        - expected_outcome: what we expect to achieve
        """
        
        # Get last 5 observations for context
        recent_obs = self.state.observations[-5:] if self.state.observations else []
        
        action = await JSON_llm(
            PLANNING_PROMPT.format(
                goal=self.state.goal,
                context=self.state.context,
                observations=recent_obs,
                patterns=self.state.learned_patterns,
                tools=self.tools
            ),
            Action
        )
        
        return action

    async def execute_action(self, action: Action) -> Observation:
        """Execute an action and record the observation"""
        try:
            result = await execute_tool(action.tool, action.params)
            success = True
        except Exception as e:
            result = str(e)
            success = False
        
        observation = Observation(
            action=action,
            result=result,
            success=success,
            timestamp=datetime.now()
        )
        
        self.state.observations.append(observation)
        return observation

    async def learn_from_observation(self, observation: Observation) -> None:
        """Update learned patterns based on observation"""
        LEARNING_PROMPT = """Analyze this observation and extract patterns or insights:
        
        Action Taken: {action}
        Result: {result}
        Success: {success}
        
        Current Patterns: {patterns}
        
        Return as JSON with updated patterns dictionary.
        """
        
        new_patterns = await JSON_llm(
            LEARNING_PROMPT.format(
                action=observation.action,
                result=observation.result,
                success=observation.success,
                patterns=self.state.learned_patterns
            ),
            Dict[str, Any]
        )
        
        self.state.learned_patterns.update(new_patterns)

    async def update_context(self, observation: Observation) -> None:
        """Update context based on observation"""
        CONTEXT_PROMPT = """Update the context based on this observation:
        
        Current Context: {context}
        Observation: {observation}
        
        Return as JSON with updated context dictionary.
        """
        
        new_context = await JSON_llm(
            CONTEXT_PROMPT.format(
                context=self.state.context,
                observation=observation
            ),
            Dict[str, Any]
        )
        
        self.state.context.update(new_context)

    async def run(self, max_steps: int = 10) -> str:
        """Run the agent to achieve its goal"""
        step = 0
        
        while step < max_steps:
            print(f"\\nStep {step + 1}")
            print("-" * 40)
            
            # Plan next action
            action = await self.plan_next_action()
            if not action:
                print("No further actions needed")
                break
            
            print(f"Planned Action: {action.tool}")
            print(f"Reason: {action.reason}")
            
            # Execute action and observe
            observation = await self.execute_action(action)
            print(f"Success: {observation.success}")
            
            # Learn from observation
            await self.learn_from_observation(observation)
            
            # Update context
            await self.update_context(observation)
            
            # Check if goal is achieved
            if await self.check_goal_achieved():
                print("\\nGoal achieved!")
                break
            
            step += 1
        
        return self.summarize_results()

    async def check_goal_achieved(self) -> bool:
        """Check if the goal has been achieved"""
        CHECK_GOAL_PROMPT = """Given the current state and goal, has the goal been achieved?
        
        Goal: {goal}
        Context: {context}
        
        Return true or false.
        """
        
        return await JSON_llm(
            CHECK_GOAL_PROMPT.format(
                goal=self.state.goal,
                context=self.state.context
            ),
            bool
        )

    def summarize_results(self) -> str:
        """Summarize the agent's results"""
        return f"""
        Goal: {self.state.goal}
        Steps Taken: {len(self.state.observations)}
        Success Rate: {
            sum(1 for o in self.state.observations if o.success) / 
            len(self.state.observations) if self.state.observations else 0
        }
        Final Context: {self.state.context}
        """

# Example usage
async def main():
    # Define available tools
    tools = {
        "search": "Search for information online",
        "extract": "Extract specific information from text",
        "summarize": "Summarize lengthy content",
        "analyze": "Analyze data or text",
        "generate": "Generate new content"
    }
    
    # Create agent with a research goal
    agent = AutonomousAgent(
        goal="Research and summarize recent developments in quantum computing",
        available_tools=tools
    )
    
    # Run agent
    result = await agent.run()
    print("\\nFinal Results:", result)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM, JSONLLM, executeTool } from './helpers';

interface Action {
  tool: string;
  params: Record<string, any>;
  reason: string;
  expected_outcome: string;
}

interface Observation {
  action: Action;
  result: any;
  success: boolean;
  timestamp: Date;
}

interface AgentState {
  goal: string;
  context: Record<string, any>;
  observations: Observation[];
  learned_patterns: Record<string, any>;
}

class AutonomousAgent {
  private state: AgentState;
  private tools: Record<string, any>;

  constructor(goal: string, availableTools: Record<string, any>) {
    this.state = {
      goal,
      context: {},
      observations: [],
      learned_patterns: {}
    };
    this.tools = availableTools;
  }

  async planNextAction(): Promise<Action | null> {
    const PLANNING_PROMPT = \`Given the current state and goal, determine the next best action.
    
    Goal: \${this.state.goal}
    Context: \${JSON.stringify(this.state.context)}
    Recent Observations: \${JSON.stringify(this.state.observations.slice(-5))}
    Learned Patterns: \${JSON.stringify(this.state.learned_patterns)}
    Available Tools: \${JSON.stringify(this.tools)}
    
    Return as JSON with:
    - tool: name of tool to use
    - params: parameters for the tool
    - reason: why this action was chosen
    - expected_outcome: what we expect to achieve
    \`;

    return await JSONLLM<Action>(PLANNING_PROMPT);
  }

  async executeAction(action: Action): Promise<Observation> {
    let result: any;
    let success: boolean;

    try {
      result = await executeTool(action.tool, action.params);
      success = true;
    } catch (error) {
      result = error.message;
      success = false;
    }

    const observation: Observation = {
      action,
      result,
      success,
      timestamp: new Date()
    };

    this.state.observations.push(observation);
    return observation;
  }

  async learnFromObservation(observation: Observation): Promise<void> {
    const LEARNING_PROMPT = \`Analyze this observation and extract patterns or insights:
    
    Action Taken: \${JSON.stringify(observation.action)}
    Result: \${JSON.stringify(observation.result)}
    Success: \${observation.success}
    
    Current Patterns: \${JSON.stringify(this.state.learned_patterns)}
    
    Return as JSON with updated patterns dictionary.
    \`;

    const newPatterns = await JSONLLM<Record<string, any>>(LEARNING_PROMPT);
    Object.assign(this.state.learned_patterns, newPatterns);
  }

  async updateContext(observation: Observation): Promise<void> {
    const CONTEXT_PROMPT = \`Update the context based on this observation:
    
    Current Context: \${JSON.stringify(this.state.context)}
    Observation: \${JSON.stringify(observation)}
    
    Return as JSON with updated context dictionary.
    \`;

    const newContext = await JSONLLM<Record<string, any>>(CONTEXT_PROMPT);
    Object.assign(this.state.context, newContext);
  }

  async run(maxSteps: number = 10): Promise<string> {
    let step = 0;

    while (step < maxSteps) {
      console.log(\`\\nStep \${step + 1}\`);
      console.log("-".repeat(40));

      // Plan next action
      const action = await this.planNextAction();
      if (!action) {
        console.log("No further actions needed");
        break;
      }

      console.log(\`Planned Action: \${action.tool}\`);
      console.log(\`Reason: \${action.reason}\`);

      // Execute action and observe
      const observation = await this.executeAction(action);
      console.log(\`Success: \${observation.success}\`);

      // Learn from observation
      await this.learnFromObservation(observation);

      // Update context
      await this.updateContext(observation);

      // Check if goal is achieved
      if (await this.checkGoalAchieved()) {
        console.log("\\nGoal achieved!");
        break;
      }

      step++;
    }

    return this.summarizeResults();
  }

  async checkGoalAchieved(): Promise<boolean> {
    const CHECK_GOAL_PROMPT = \`Given the current state and goal, has the goal been achieved?
    
    Goal: \${this.state.goal}
    Context: \${JSON.stringify(this.state.context)}
    
    Return true or false.
    \`;

    return await JSONLLM<boolean>(CHECK_GOAL_PROMPT);
  }

  summarizeResults(): string {
    const successRate = this.state.observations.length
      ? this.state.observations.filter(o => o.success).length / 
        this.state.observations.length
      : 0;

    return \`
    Goal: \${this.state.goal}
    Steps Taken: \${this.state.observations.length}
    Success Rate: \${successRate}
    Final Context: \${JSON.stringify(this.state.context)}
    \`;
  }
}

// Example usage
async function main() {
  // Define available tools
  const tools = {
    search: "Search for information online",
    extract: "Extract specific information from text",
    summarize: "Summarize lengthy content",
    analyze: "Analyze data or text",
    generate: "Generate new content"
  };

  // Create agent with a research goal
  const agent = new AutonomousAgent(
    "Research and summarize recent developments in quantum computing",
    tools
  );

  // Run agent
  const result = await agent.run();
  console.log("\\nFinal Results:", result);
}

main().catch(console.error);`
};
