import config from '@payload-config';
import { Locale } from 'next-intl';
import { getPayload } from 'payload';

export interface CollectionQueryOptions {
  sort?: string;
  limit?: number;
  where?: Record<string, unknown>;
}

type CollectionSlug = 'experience' | 'education' | 'projects' | 'testimonials' | 'contributions';

const defaultSortByCollection: Record<CollectionSlug, string> = {
  experience: 'order',
  education: 'order',
  projects: 'order',
  testimonials: 'order',
  contributions: 'createdAt',
};

export async function findCollection<T>(
  collection: CollectionSlug,
  locale: Locale,
  options: CollectionQueryOptions = {},
): Promise<T[]> {
  const payload = await getPayload({ config });

  const sort = options.sort ?? defaultSortByCollection[collection] ?? 'order';

  const result = await payload.find({
    collection,
    where: {
      locale: { equals: locale },
      _status: { equals: 'published' },
      ...options.where,
    },
    sort,
    limit: options.limit,
  });

  return result.docs as T[];
}

export async function findOneBySlug<T>(
  collection: CollectionSlug,
  slug: string,
): Promise<T | null> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  return (result.docs?.[0] as T) ?? null;
}
