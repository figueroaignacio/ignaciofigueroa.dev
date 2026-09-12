import { cookies } from 'next/headers';
import { toApiError } from './api-error';
import { env } from './env';

interface PublicReadOptions {
  revalidate?: number | false;
  tags?: string[];
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, init);
  if (!response.ok) throw await toApiError(response);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

/**
 * Public reads never touch cookies: they run during static generation too
 * (generateStaticParams, sitemap, llms.txt), where no request exists.
 */
export function apiPublic<T>(path: string, options: PublicReadOptions = {}): Promise<T> {
  const { revalidate = 300, tags } = options;
  return request<T>(path, {
    headers: { 'content-type': 'application/json' },
    ...(revalidate === false
      ? { cache: 'no-store' as const }
      : { next: { revalidate, ...(tags ? { tags } : {}) } }),
  });
}

/** Admin reads forward the session cookie and are never cached. */
export async function apiAdmin<T>(path: string, init: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.authCookieName)?.value;

  return request<T>(path, {
    ...init,
    cache: 'no-store',
    headers: {
      'content-type': 'application/json',
      ...(token ? { cookie: `${env.authCookieName}=${token}` } : {}),
      ...init.headers,
    },
  });
}

export function toQuery(params: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value));
  }
  const value = query.toString();
  return value ? `?${value}` : '';
}
