import { routing } from '@/i18n/routing';
import { buildLlmsTxt } from '@/shared/lib/llms-txt';
import type { NextRequest } from 'next/server';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get('lang');
  const locale = requested === 'es' || requested === 'en' ? requested : routing.defaultLocale;

  const body = await buildLlmsTxt(locale as 'en' | 'es', true);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
