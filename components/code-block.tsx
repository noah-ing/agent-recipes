"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  python: string
  typescript: string
}

export function CodeBlock({ python, typescript }: CodeBlockProps) {
  const [language, setLanguage] = useState<"python" | "typescript">("python")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-mono">Implementation</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage("python")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              language === "python"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Python
          </button>
          <button
            onClick={() => setLanguage("typescript")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              language === "typescript"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            TypeScript
          </button>
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code className="text-sm">
            {language === "python" ? python : typescript}
          </code>
        </pre>
      </div>
    </div>
  )
}
