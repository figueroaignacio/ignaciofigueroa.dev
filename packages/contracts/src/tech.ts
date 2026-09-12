import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import { uuidSchema } from './common.js';

export const createTechIconSchema = z.object({
  name: z.string().min(1).max(80),
  svg: z.string().min(1).max(50_000),
});
export const updateTechIconSchema = toUpdateSchema(createTechIconSchema);

export const createTechStackSchema = z.object({
  name: z.string().min(1).max(80),
  iconId: uuidSchema.nullable().optional(),
});
export const updateTechStackSchema = toUpdateSchema(createTechStackSchema);

export type CreateTechIconInput = z.infer<typeof createTechIconSchema>;
export type UpdateTechIconInput = z.infer<typeof updateTechIconSchema>;
export type CreateTechStackInput = z.infer<typeof createTechStackSchema>;
export type UpdateTechStackInput = z.infer<typeof updateTechStackSchema>;
