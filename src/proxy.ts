import { NextResponse } from 'next/server';

export function proxy() {
  const response = NextResponse.next();

  // Content Security Policy
  const csp = [
    // Default to self for everything except what's explicitly allowed
    "default-src 'self'",
    // Scripts: allow self, inline scripts, and specific trusted domains
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    // Styles: allow self and inline styles
    "style-src 'self' 'unsafe-inline'",
    // Images: allow self, data URLs, and image optimization
    "img-src 'self' data: https:",
    // Fonts: allow self and font optimization
    "font-src 'self'",
    // Connect: allow self and specific domains for API calls
    "connect-src 'self' https://formspree.io",
    // Frame ancestors: prevent clickjacking
    "frame-ancestors 'none'",
    // Base URI: restrict to current origin
    "base-uri 'self'",
    // Form action: allow same origin and Formspree
    "form-action 'self' https://formspree.io",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
