import { Locale } from 'next-intl';

import type { Contribution } from '@/payload-types';
import { findCollection } from '@/shared/lib/collection-query';

export async function getContributions(locale: Locale): Promise<Contribution[]> {
  return findCollection<Contribution>('contributions', locale);
}
