import { getContributions } from '@/features/home/api/contributions';
import { getEducation } from '@/features/home/api/education';
import { getExperiences } from '@/features/home/api/experience';
import { getTestimonials } from '@/features/home/api/testimonials';
import { getProjects } from '@/features/projects/api/projects';
import { Locale } from 'next-intl';

interface Timestamped {
  createdAt?: string | null;
  updatedAt?: string | null;
}

const TRACKED = [getProjects, getExperiences, getEducation, getContributions, getTestimonials];

export interface ContentFreshness {
  firstPublished: Date;
  lastModified: Date;
}

export async function getContentFreshness(locale: Locale): Promise<ContentFreshness> {
  const buildTime = new Date();

  const docs = await Promise.all(
    TRACKED.map(async (read) => {
      try {
        return (await read(locale)) as Timestamped[];
      } catch (error) {
        console.warn(`Freshness: a collection failed to load for ${locale}:`, error);
        return [] as Timestamped[];
      }
    }),
  );

  const toTimestamps = (key: 'createdAt' | 'updatedAt') =>
    docs
      .flat()
      .map((doc) => {
        const value = doc[key];
        return value ? Date.parse(value) : NaN;
      })
      .filter((value) => Number.isFinite(value));

  const created = toTimestamps('createdAt');
  const updated = toTimestamps('updatedAt');

  return {
    firstPublished: created.length ? new Date(Math.min(...created)) : buildTime,
    lastModified: updated.length ? new Date(Math.max(...updated)) : buildTime,
  };
}
