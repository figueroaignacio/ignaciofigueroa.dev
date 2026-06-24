import config from '@payload-config';
import { Locale } from 'next-intl';
import { unstable_cache } from 'next/cache';
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

const cacheTTLByCollection: Record<CollectionSlug, number> = {
  experience: 3600,
  education: 3600,
  testimonials: 3600,
  contributions: 1800,
  projects: 900,
};

async function _findCollection<T>(
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

export async function findCollection<T>(
  collection: CollectionSlug,
  locale: Locale,
  options: CollectionQueryOptions = {},
): Promise<T[]> {
  const ttl = cacheTTLByCollection[collection];
  const cacheKey = [collection, locale, JSON.stringify(options)];

  const cachedFn = unstable_cache(() => _findCollection<T>(collection, locale, options), cacheKey, {
    revalidate: ttl,
    tags: [collection, `${collection}-${locale}`],
  });

  return cachedFn();
}

export async function findOneBySlug<T>(
  collection: CollectionSlug,
  slug: string,
): Promise<T | null> {
  const cachedFn = unstable_cache(
    async () => {
      const payload = await getPayload({ config });

      const result = await payload.find({
        collection,
        where: {
          slug: { equals: slug },
        },
        limit: 1,
      });

      return (result.docs?.[0] as T) ?? null;
    },
    [collection, slug],
    {
      revalidate: 3600,
      tags: [collection, `${collection}-${slug}`],
    },
  );

  return cachedFn();
}
