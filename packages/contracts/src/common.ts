import { z } from 'zod';

export const LOCALES = ['en', 'es'] as const;
export const CONTENT_STATUSES = ['draft', 'published'] as const;

export const localeSchema = z.enum(LOCALES);
export const contentStatusSchema = z.enum(CONTENT_STATUSES);
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case');
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');
export const urlSchema = z.url();
export const optionalUrl = urlSchema.or(z.literal('')).nullable().optional();
export const optionalText = z.string().nullable().optional();
export const uuidSchema = z.uuid();

export const localeQuerySchema = z.object({
  locale: localeSchema.optional(),
});

export const adminListQuerySchema = z.object({
  locale: localeSchema.optional(),
  status: contentStatusSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type Locale = z.infer<typeof localeSchema>;
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type AdminListQuery = z.infer<typeof adminListQuerySchema>;

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
