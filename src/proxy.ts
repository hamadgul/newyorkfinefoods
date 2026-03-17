import { NextResponse } from 'next/server';

export function proxy() {
  const response = NextResponse.next();

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    // Remove unsafe-eval; unsafe-inline is retained for Next.js hydration scripts
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    // Restrict images to known domains only
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self'",
    "connect-src 'self' https://formspree.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  // strict-origin-when-cross-origin is safer than no-referrer for same-origin navigation
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  // Deprecated header — set to 0 per OWASP; rely on CSP for XSS protection instead
  response.headers.set('X-XSS-Protection', '0');
  // Force HTTPS for 1 year, including subdomains
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Disable browser features not needed by this site
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

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
