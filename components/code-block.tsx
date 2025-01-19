"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  python: string
  typescript: string
}

export function CodeBlock({ python, typescript }: CodeBlockProps) {
  const [language, setLanguage] = useState<"python" | "typescript">("python")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    const codeToCopy = language === "python" ? python : typescript
    await navigator.clipboard.writeText(codeToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 p-2 rounded-md bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
