import { z } from 'zod';
import { toUpdateSchema } from './partial.js';
import { contentStatusSchema, localeSchema, optionalUrl, urlSchema, uuidSchema } from './common.js';

export const pullRequestSchema = z.object({
  url: urlSchema,
  label: z.string().max(300).nullable().default(null),
});

export const createContributionSchema = z.object({
  locale: localeSchema.default('en'),
  status: contentStatusSchema.default('draft'),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  repository: urlSchema,
  fork: optionalUrl,
  pullRequests: z.array(pullRequestSchema).default([]),
  syncPullRequests: z.boolean().default(true),
  order: z.number().int().default(0),
  technologyIds: z.array(uuidSchema).default([]),
});
export const updateContributionSchema = toUpdateSchema(createContributionSchema);

export type PullRequestInput = z.infer<typeof pullRequestSchema>;
export type CreateContributionInput = z.infer<typeof createContributionSchema>;
export type UpdateContributionInput = z.infer<typeof updateContributionSchema>;
