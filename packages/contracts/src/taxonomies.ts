import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import { slugSchema } from './common.js';

export const createProjectCategorySchema = z.object({
  label: z.string().min(1).max(80),
  slug: slugSchema.optional(),
});
export const updateProjectCategorySchema = toUpdateSchema(createProjectCategorySchema);

export const createProjectLabelSchema = z.object({
  label: z.string().min(1).max(80),
});
export const updateProjectLabelSchema = toUpdateSchema(createProjectLabelSchema);

export type CreateProjectCategoryInput = z.infer<typeof createProjectCategorySchema>;
export type UpdateProjectCategoryInput = z.infer<typeof updateProjectCategorySchema>;
export type CreateProjectLabelInput = z.infer<typeof createProjectLabelSchema>;
export type UpdateProjectLabelInput = z.infer<typeof updateProjectLabelSchema>;
