import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple nonce generator that doesn't rely on crypto
function generateNonce() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''
  for (let i = 0; i < 16; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return btoa(nonce)
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Basic security headers
  const headers = response.headers

  // Prevent XSS attacks
  headers.set('X-XSS-Protection', '1; mode=block')
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff')
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy
  const nonce = generateNonce()
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'unsafe-eval'`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data:",
      "font-src 'self'",
      "connect-src 'self' https://api.together.ai",
      "frame-ancestors 'none'",
    ].join('; ')
  )
  
  // HSTS
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  
  // Frame Options
  headers.set('X-Frame-Options', 'DENY')
  
  // Permissions Policy
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  request.headers.set('x-nonce', nonce)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
