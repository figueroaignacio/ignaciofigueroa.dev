'use server';

import { updateTag } from 'next/cache';

const CONTENT_TAGS = [
  'projects',
  'experiences',
  'education',
  'testimonials',
  'contributions',
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

export async function revalidateContent(tag: ContentTag) {
  if (!CONTENT_TAGS.includes(tag)) return;
  updateTag(tag);
}
