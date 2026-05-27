import { Locale } from 'next-intl';

import type { Experience } from '@/payload-types';
import { findCollection } from '@/shared/lib/collection-query';

export async function getExperiences(locale: Locale): Promise<Experience[]> {
  return findCollection<Experience>('experience', locale);
}
