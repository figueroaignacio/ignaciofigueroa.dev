import { apiClient } from '@/shared/lib/api-client';
import type { AuthUser } from '@repo/contracts';

export type LoginResponse = { user: AuthUser; redirectTo: string };

export function login(email: string, password: string) {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiClient<void>('/auth/logout', { method: 'POST' });
}
