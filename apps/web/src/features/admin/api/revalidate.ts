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

/**
 * Public pages read the API through the Next data cache, so an edit in the
 * panel has to drop the tag it touched or the site keeps serving the old copy
 * until the five minute window expires. `updateTag` expires it immediately,
 * which is what an editor expects after hitting save.
 */
export async function revalidateContent(tag: ContentTag) {
  if (!CONTENT_TAGS.includes(tag)) return;
  updateTag(tag);
}
