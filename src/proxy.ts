import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Prevent clickjacking — no iframe embedding
  response.headers.set('X-Frame-Options', 'DENY')

  // Enforce HTTPS for 1 year, include subdomains
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Restrict permissions
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // Scripts: self + inline (Next.js needs inline scripts for hydration)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + inline (Tailwind injects inline styles)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + data URIs + Supabase storage + OpenStreetMap tiles
      "img-src 'self' data: blob: https://*.supabase.co https://*.tile.openstreetmap.org",
      // Fonts: self
      "font-src 'self'",
      // API connections: self + Supabase
      "connect-src 'self' https://*.supabase.co",
      // Frames: none
      "frame-ancestors 'none'",
      // Forms: self only
      "form-action 'self'",
      // Base URI: self
      "base-uri 'self'",
    ].join('; ')
  )

  return response
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
}
