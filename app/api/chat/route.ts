import { Together } from "@together-ai/sdk"
import { rateLimiter, speedLimiter } from '@/lib/rate-limit'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Input validation schema
const messageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(4000)
  }))
})

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY
})

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    await Promise.all([
      new Promise((resolve) => rateLimiter(req, NextResponse, resolve)),
      new Promise((resolve) => speedLimiter(req, NextResponse, resolve))
    ])

    const body = await req.json()
    
    // Validate input
    const validatedData = messageSchema.parse(body)

    const response = await together.chat.create({
      model: "togethercomputer/llama-2-70b-chat",
      messages: validatedData.messages,
      temperature: 0.7,
      max_tokens: 1024,
    })

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        error: 'Invalid request format',
        details: error.errors
      }), { status: 400 })
    }

    if (error instanceof Error && error.message === 'Too many requests') {
      return new Response(JSON.stringify({
        error: 'Rate limit exceeded. Please try again later.'
      }), { status: 429 })
    }

    // Don't expose internal error details to client
    return new Response(JSON.stringify({
      error: 'An error occurred while processing your request'
    }), { status: 500 })
  }
}

