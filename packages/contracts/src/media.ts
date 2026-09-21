import { z } from 'zod';

export const MEDIA_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
] as const;
export const MEDIA_MAX_BYTES = 4 * 1024 * 1024;

export const updateMediaSchema = z.object({
  alt: z.string().max(300),
});

export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;
