import { NextResponse } from 'next/server'

const WINDOW_SIZE = 15 * 60 * 1000 // 15 minutes in milliseconds
const MAX_REQUESTS = 100

class RateLimiter {
  private timestamps: number[] = []

  isRateLimited(): boolean {
    const now = Date.now()
    // Remove timestamps outside the window
    this.timestamps = this.timestamps.filter(ts => now - ts < WINDOW_SIZE)
    
    // Check if we've exceeded the limit
    if (this.timestamps.length >= MAX_REQUESTS) {
      return true
    }
    
    // Add current timestamp
    this.timestamps.push(now)
    return false
  }
}

// Create a single instance
const limiter = new RateLimiter()

export function checkRateLimit() {
  if (limiter.isRateLimited()) {
    throw new Error('Too many requests')
  }
}

// Export a dummy function to maintain compatibility with existing code
export const rateLimiter = (_req: Request, _res: typeof NextResponse, resolve: () => void) => {
  try {
    checkRateLimit()
    resolve()
  } catch (error) {
    throw new Error('Too many requests')
  }
}

export const speedLimiter = (_req: Request, _res: typeof NextResponse, resolve: () => void) => {
  // Simple pass-through for now
  resolve()
}
