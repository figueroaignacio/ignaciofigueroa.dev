import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon.ico|.*\\..*).*)'],
};
