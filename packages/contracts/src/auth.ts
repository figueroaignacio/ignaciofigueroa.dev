import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: 'admin';
};
