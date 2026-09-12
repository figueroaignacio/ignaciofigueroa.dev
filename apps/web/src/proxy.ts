import { routing } from '@/i18n/routing';
import { env } from '@/shared/lib/env';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const hasSession = request.cookies.has(env.authCookieName);
    if (pathname !== '/admin/login' && !hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
