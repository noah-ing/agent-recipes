import "./globals.css"
import { JetBrains_Mono } from 'next/font/google'
import { cn } from "@/lib/utils"
import { SWRProvider } from '@/lib/swr-config'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: 'Agent Recipes - AI Workflow Patterns',
  description: 'Explore common AI agent recipes with ready-to-use code to improve your LLM applications.',
  keywords: ['AI', 'LLM', 'Workflows', 'Agent Recipes', 'Machine Learning'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Agent Recipes - AI Workflow Patterns',
    description: 'Explore common AI agent recipes with ready-to-use code to improve your LLM applications.',
    url: 'https://your-website-url.com',
    siteName: 'Agent Recipes',
    images: [
      {
        url: 'https://your-website-url.com/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Agent Recipes OG Image',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Recipes - AI Workflow Patterns',
    description: 'Explore common AI agent recipes with ready-to-use code to improve your LLM applications.',
    images: ['https://your-website-url.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get('x-nonce')
  return (
    <html lang="en" className="dark" {...nonce ? { 'data-csp-nonce': nonce } : {}}>
      <body className={cn(
        "min-h-screen font-mono antialiased bg-background text-foreground",
        jetbrainsMono.variable
      )}>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            <div className="container relative mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <SWRProvider>
                {children}
              </SWRProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
