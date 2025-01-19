"use client"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { notFound } from "next/navigation"

import {
  Recipe,
  workflowImages,
  promptChaining,
  routing,
  parallelization,
  orchestratorWorkers,
  evaluatorOptimizer,
  autonomousAgent,
  codingAgent,
  augmentedLlm
} from '../data';

// Combine all recipes into a single object
const workflows = {
  "prompt-chaining": promptChaining,
  "routing": routing,
  "parallelization": parallelization,
  "orchestrator-workers": orchestratorWorkers,
  "evaluator-optimizer": evaluatorOptimizer,
  "autonomous-agent": autonomousAgent,
  "coding-agent": codingAgent,
  "augmented-llm": augmentedLlm
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
            {workflow.useCases.map((useCase: string, index: number) => (
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
