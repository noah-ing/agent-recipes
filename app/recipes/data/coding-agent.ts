import { Recipe } from './index';

export const codingAgent: Recipe = {
  title: "Coding Agent",
  tag: "Agent",
  description: "A sophisticated workflow for AI-powered code generation that implements a robust process of task clarification, code writing, and test-driven development.",
  explanation: "The diagram illustrates a comprehensive coding agent workflow with two main loops. The first loop ('Until tasks clear') handles task clarification between the human and LLM through the interface. The second loop ('Until tests pass') manages the code generation and testing process, where the LLM interacts with the environment to write, test, and refine code until it meets the specified requirements.",
  useCases: [
    "Automated Code Generation: Generate code based on natural language descriptions with built-in testing and validation.",
    "Code Refactoring: Analyze existing code and suggest improvements while maintaining functionality.",
    "Test-Driven Development: Generate test cases and implementation code iteratively."
  ],
  pythonCode: `from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from helpers import run_llm, JSON_llm, execute_command

class Requirement(BaseModel):
    """Represents a clarified requirement"""
    description: str
    acceptance_criteria: List[str]
    test_cases: List[Dict[str, Any]]

class TestResult(BaseModel):
    """Represents the result of running tests"""
    passed: bool
    failed_tests: List[str]
    error_messages: List[str]
    coverage: float

class CodingAgent:
    def __init__(self):
        self.requirements: List[Requirement] = []
        self.current_code: str = ""
        self.test_code: str = ""
        
    async def clarify_requirements(self, task_description: str) -> List[Requirement]:
        """Clarify requirements through interaction with LLM"""
        CLARIFICATION_PROMPT = """Analyze this coding task and break it down into clear requirements.
        For each requirement:
        1. Provide a clear description
        2. List specific acceptance criteria
        3. Define test cases with inputs and expected outputs
        
        Task: {task}
        
        Return as JSON array of requirements."""
        
        self.requirements = await JSON_llm(
            CLARIFICATION_PROMPT.format(task=task_description),
            List[Requirement]
        )
        
        return self.requirements
    
    async def generate_test_code(self) -> str:
        """Generate test code based on requirements"""
        TEST_PROMPT = """Generate pytest test code for these requirements:
        {requirements}
        
        Include:
        1. Test cases for each requirement
        2. Edge cases and error conditions
        3. Proper test organization and setup
        
        Return only the test code."""
        
        self.test_code = await run_llm(
            TEST_PROMPT.format(requirements=self.requirements)
        )
        
        return self.test_code
    
    async def generate_implementation(self) -> str:
        """Generate implementation code based on requirements and tests"""
        IMPLEMENTATION_PROMPT = """Generate implementation code that satisfies these requirements and passes these tests:
        
        Requirements:
        {requirements}
        
        Test Code:
        {test_code}
        
        Follow these guidelines:
        1. Write clean, well-documented code
        2. Include type hints
        3. Handle edge cases
        4. Follow PEP 8 style guide
        
        Return only the implementation code."""
        
        self.current_code = await run_llm(
            IMPLEMENTATION_PROMPT.format(
                requirements=self.requirements,
                test_code=self.test_code
            )
        )
        
        return self.current_code
    
    async def run_tests(self) -> TestResult:
        """Run tests and return results"""
        try:
            # Save code to temporary files
            with open("temp_implementation.py", "w") as f:
                f.write(self.current_code)
            with open("temp_test.py", "w") as f:
                f.write(self.test_code)
            
            # Run pytest with coverage
            result = await execute_command(
                "pytest temp_test.py --cov=temp_implementation -v"
            )
            
            # Parse test results
            return TestResult(
                passed=result.returncode == 0,
                failed_tests=self._parse_failed_tests(result.output),
                error_messages=self._parse_error_messages(result.output),
                coverage=self._parse_coverage(result.output)
            )
        finally:
            # Cleanup temporary files
            await execute_command("rm temp_implementation.py temp_test.py")
    
    async def fix_issues(self, test_result: TestResult) -> str:
        """Fix issues based on test results"""
        FIX_PROMPT = """Fix the following issues in the code:
        
        Current Code:
        {code}
        
        Test Results:
        Failed Tests: {failed_tests}
        Error Messages: {errors}
        
        Return the fixed implementation code."""
        
        self.current_code = await run_llm(
            FIX_PROMPT.format(
                code=self.current_code,
                failed_tests=test_result.failed_tests,
                errors=test_result.error_messages
            )
        )
        
        return self.current_code
    
    async def process_task(self, task_description: str, max_iterations: int = 5) -> str:
        """Process a coding task from start to finish"""
        print("1. Clarifying Requirements...")
        requirements = await self.clarify_requirements(task_description)
        for i, req in enumerate(requirements, 1):
            print(f"\\nRequirement {i}:")
            print(f"Description: {req.description}")
            print("Acceptance Criteria:")
            for ac in req.acceptance_criteria:
                print(f"- {ac}")
        
        print("\\n2. Generating Tests...")
        test_code = await self.generate_test_code()
        print("Test code generated.")
        
        print("\\n3. Implementing Solution...")
        implementation = await self.generate_implementation()
        print("Initial implementation complete.")
        
        iteration = 0
        while iteration < max_iterations:
            print(f"\\n4. Running Tests (Iteration {iteration + 1})...")
            test_result = await self.run_tests()
            
            print(f"Tests Passed: {test_result.passed}")
            print(f"Coverage: {test_result.coverage}%")
            
            if test_result.passed and test_result.coverage >= 90:
                print("\\nAll tests passed with good coverage!")
                break
            
            print("\\n5. Fixing Issues...")
            await self.fix_issues(test_result)
            iteration += 1
        
        return self.current_code

# Example usage
async def main():
    task = """
    Create a function that processes a list of financial transactions.
    Requirements:
    1. Calculate total amount, average transaction size
    2. Identify outliers (transactions > 2 standard deviations from mean)
    3. Group transactions by category
    4. Handle invalid inputs appropriately
    """
    
    agent = CodingAgent()
    final_code = await agent.process_task(task)
    print("\\nFinal Implementation:\\n", final_code)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())`,
  typescriptCode: `import { LLMResponse } from './types';
import { runLLM, JSONLLM, executeCommand } from './helpers';

interface Requirement {
  description: string;
  acceptance_criteria: string[];
  test_cases: Array<Record<string, any>>;
}

interface TestResult {
  passed: boolean;
  failed_tests: string[];
  error_messages: string[];
  coverage: number;
}

class CodingAgent {
  private requirements: Requirement[] = [];
  private currentCode: string = "";
  private testCode: string = "";

  async clarifyRequirements(taskDescription: string): Promise<Requirement[]> {
    const CLARIFICATION_PROMPT = \`Analyze this coding task and break it down into clear requirements.
    For each requirement:
    1. Provide a clear description
    2. List specific acceptance criteria
    3. Define test cases with inputs and expected outputs
    
    Task: \${taskDescription}
    
    Return as JSON array of requirements.\`;

    this.requirements = await JSONLLM<Requirement[]>(CLARIFICATION_PROMPT);
    return this.requirements;
  }

  async generateTestCode(): Promise<string> {
    const TEST_PROMPT = \`Generate Jest test code for these requirements:
    \${JSON.stringify(this.requirements, null, 2)}
    
    Include:
    1. Test cases for each requirement
    2. Edge cases and error conditions
    3. Proper test organization and setup
    
    Return only the test code.\`;

    this.testCode = await runLLM(TEST_PROMPT);
    return this.testCode;
  }

  async generateImplementation(): Promise<string> {
    const IMPLEMENTATION_PROMPT = \`Generate implementation code that satisfies these requirements and passes these tests:
    
    Requirements:
    \${JSON.stringify(this.requirements, null, 2)}
    
    Test Code:
    \${this.testCode}
    
    Follow these guidelines:
    1. Write clean, well-documented code
    2. Include TypeScript types
    3. Handle edge cases
    4. Follow standard style guide
    
    Return only the implementation code.\`;

    this.currentCode = await runLLM(IMPLEMENTATION_PROMPT);
    return this.currentCode;
  }

  async runTests(): Promise<TestResult> {
    try {
      // Save code to temporary files
      await executeCommand(\`
        echo '\${this.currentCode}' > temp_implementation.ts
        echo '\${this.testCode}' > temp_test.ts
      \`);

      // Run Jest with coverage
      const result = await executeCommand(
        "jest temp_test.ts --coverage --json"
      );

      // Parse test results from JSON output
      const testResults = JSON.parse(result.output);

      return {
        passed: testResults.success,
        failed_tests: this.parseFailedTests(testResults),
        error_messages: this.parseErrorMessages(testResults),
        coverage: this.parseCoverage(testResults)
      };
    } finally {
      // Cleanup temporary files
      await executeCommand("rm temp_implementation.ts temp_test.ts");
    }
  }

  async fixIssues(testResult: TestResult): Promise<string> {
    const FIX_PROMPT = \`Fix the following issues in the code:
    
    Current Code:
    \${this.currentCode}
    
    Test Results:
    Failed Tests: \${JSON.stringify(testResult.failed_tests)}
    Error Messages: \${JSON.stringify(testResult.error_messages)}
    
    Return the fixed implementation code.\`;

    this.currentCode = await runLLM(FIX_PROMPT);
    return this.currentCode;
  }

  async processTask(
    taskDescription: string,
    maxIterations: number = 5
  ): Promise<string> {
    console.log("1. Clarifying Requirements...");
    const requirements = await this.clarifyRequirements(taskDescription);
    requirements.forEach((req, i) => {
      console.log(\`\\nRequirement \${i + 1}:\`);
      console.log(\`Description: \${req.description}\`);
      console.log("Acceptance Criteria:");
      req.acceptance_criteria.forEach(ac => console.log(\`- \${ac}\`));
    });

    console.log("\\n2. Generating Tests...");
    await this.generateTestCode();
    console.log("Test code generated.");

    console.log("\\n3. Implementing Solution...");
    await this.generateImplementation();
    console.log("Initial implementation complete.");

    let iteration = 0;
    while (iteration < maxIterations) {
      console.log(\`\\n4. Running Tests (Iteration \${iteration + 1})...\`);
      const testResult = await this.runTests();

      console.log(\`Tests Passed: \${testResult.passed}\`);
      console.log(\`Coverage: \${testResult.coverage}%\`);

      if (testResult.passed && testResult.coverage >= 90) {
        console.log("\\nAll tests passed with good coverage!");
        break;
      }

      console.log("\\n5. Fixing Issues...");
      await this.fixIssues(testResult);
      iteration++;
    }

    return this.currentCode;
  }

  private parseFailedTests(testResults: any): string[] {
    // Implementation of test results parsing
    return [];
  }

  private parseErrorMessages(testResults: any): string[] {
    // Implementation of error message parsing
    return [];
  }

  private parseCoverage(testResults: any): number {
    // Implementation of coverage parsing
    return 0;
  }
}

// Example usage
async function main() {
  const task = \`
    Create a function that processes a list of financial transactions.
    Requirements:
    1. Calculate total amount, average transaction size
    2. Identify outliers (transactions > 2 standard deviations from mean)
    3. Group transactions by category
    4. Handle invalid inputs appropriately
  \`;

  const agent = new CodingAgent();
  const finalCode = await agent.processTask(task);
  console.log("\\nFinal Implementation:\\n", finalCode);
}

main().catch(console.error);`
};
