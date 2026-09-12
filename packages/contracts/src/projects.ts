import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import {
  contentStatusSchema,
  localeSchema,
  optionalText,
  optionalUrl,
  slugSchema,
  uuidSchema,
} from './common.js';

export const createProjectSchema = z.object({
  locale: localeSchema.default('en'),
  status: contentStatusSchema.default('draft'),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(300).default(''),
  slug: slugSchema.optional(),
  description: z.string().max(2000).default(''),
  body: z.string().max(200_000).default(''),
  icon: optionalText,
  imageId: uuidSchema.nullable().optional(),
  videoUrl: optionalUrl,
  repository: optionalUrl,
  demo: optionalUrl,
  isCommercial: z.boolean().default(false),
  order: z.number().int().default(0),
  technologyIds: z.array(uuidSchema).default([]),
  labelIds: z.array(uuidSchema).default([]),
  categoryIds: z.array(uuidSchema).default([]),
});
export const updateProjectSchema = toUpdateSchema(createProjectSchema);

export const listProjectsQuerySchema = z.object({
  locale: localeSchema.optional(),
  category: slugSchema.optional(),
  commercial: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
