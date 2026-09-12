import { toApiError } from './api-error';
import { env } from './env';

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...init.headers,
    },
  });

  if (!response.ok) throw await toApiError(response);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function uploadFile<T>(path: string, body: FormData): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, {
    method: 'POST',
    credentials: 'include',
    body,
  });

  if (!response.ok) throw await toApiError(response);
  return (await response.json()) as T;
}
