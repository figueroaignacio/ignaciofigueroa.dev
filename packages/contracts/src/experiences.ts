import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import {
  contentStatusSchema,
  isoDateSchema,
  localeSchema,
  optionalText,
  optionalUrl,
} from './common.js';

export const createExperienceSchema = z.object({
  locale: localeSchema.default('en'),
  status: contentStatusSchema.default('draft'),
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  location: optionalText,
  tasks: z.array(z.string().min(1).max(500)).default([]),
  technologies: z.array(z.string().min(1).max(80)).default([]),
  startDate: isoDateSchema,
  endDate: isoDateSchema.nullable().optional(),
  isCurrent: z.boolean().default(false),
  link: optionalUrl,
  order: z.number().int().default(0),
});
export const updateExperienceSchema = toUpdateSchema(createExperienceSchema);

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
