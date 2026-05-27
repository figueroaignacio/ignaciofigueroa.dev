import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/shared/lib/constants';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host');
  const { pathname } = request.nextUrl;

  if (host?.includes('vercel.app')) {
    const targetUrl = new URL(pathname, BASE_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.redirect(targetUrl, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon.ico|.*\\..*).*)'],
};
