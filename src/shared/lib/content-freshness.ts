import { Locale } from 'next-intl';
import { findCollection } from './collection-query';

interface Timestamped {
  createdAt?: string | null;
  updatedAt?: string | null;
}

const TRACKED = ['projects', 'experience', 'education', 'contributions', 'testimonials'] as const;

export interface ContentFreshness {
  firstPublished: Date;
  lastModified: Date;
}

export async function getContentFreshness(locale: Locale): Promise<ContentFreshness> {
  const buildTime = new Date();

  const docs = await Promise.all(
    TRACKED.map(async (collection) => {
      try {
        return await findCollection<Timestamped>(collection, locale);
      } catch (error) {
        console.warn(`Freshness: failed to read ${collection} for ${locale}:`, error);
        return [];
      }
    }),
  );

  const toTimestamps = (key: 'createdAt' | 'updatedAt') =>
    docs
      .flat()
      .map((doc) => (doc[key] ? Date.parse(doc[key]) : NaN))
      .filter((value) => Number.isFinite(value));

  const created = toTimestamps('createdAt');
  const updated = toTimestamps('updatedAt');

  return {
    firstPublished: created.length ? new Date(Math.min(...created)) : buildTime,
    lastModified: updated.length ? new Date(Math.max(...updated)) : buildTime,
  };
}
