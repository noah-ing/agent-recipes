'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  python: string
  typescript: string
  className?: string
}

export function CodeBlock({ python, typescript, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative", className)}>
      <Tabs defaultValue="python" className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-mono mb-4">Code Example</h2>
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          </TabsList>
        </div>
        <div className="relative mt-4">
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={() => copyToClipboard(python)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <TabsContent value="python">
            <pre className="rounded-lg bg-muted/50 p-4 overflow-x-auto">
              <code className="text-sm font-mono">{python}</code>
            </pre>
          </TabsContent>
          <TabsContent value="typescript">
            <pre className="rounded-lg bg-muted/50 p-4 overflow-x-auto">
              <code className="text-sm font-mono">{typescript}</code>
            </pre>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

