import { apiAdmin } from '@/shared/lib/api-server';
import type { AuthUser } from '@repo/contracts';

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { user } = await apiAdmin<{ user: AuthUser }>('/auth/me');
    return user;
  } catch {
    return null;
  }
}
