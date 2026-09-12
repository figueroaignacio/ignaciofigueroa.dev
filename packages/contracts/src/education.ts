import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import {
  contentStatusSchema,
  isoDateSchema,
  localeSchema,
  optionalText,
  optionalUrl,
} from './common.js';

export const createEducationSchema = z.object({
  locale: localeSchema.default('en'),
  status: contentStatusSchema.default('draft'),
  title: z.string().min(1).max(200),
  institution: z.string().min(1).max(200),
  location: optionalText,
  description: optionalText,
  startDate: isoDateSchema,
  endDate: isoDateSchema.nullable().optional(),
  isCurrent: z.boolean().default(false),
  certificateUrl: optionalUrl,
  highlight: z.boolean().default(false),
  order: z.number().int().default(0),
});
export const updateEducationSchema = toUpdateSchema(createEducationSchema);

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
