import type { AuthUser } from '@repo/contracts';

export type { AuthUser };

export interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin';
}
