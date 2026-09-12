import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import {
  contentStatusSchema,
  isoDateSchema,
  localeSchema,
  optionalText,
  optionalUrl,
} from './common.js';

export const createTestimonialSchema = z.object({
  locale: localeSchema.default('en'),
  status: contentStatusSchema.default('draft'),
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  company: optionalText,
  avatar: optionalUrl,
  testimonial: z.string().min(1).max(3000),
  date: isoDateSchema.nullable().optional(),
  order: z.number().int().default(0),
});
export const updateTestimonialSchema = toUpdateSchema(createTestimonialSchema);

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
