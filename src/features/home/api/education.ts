import { Locale } from 'next-intl';

import type { Education } from '@/payload-types';
import { findCollection } from '@/shared/lib/collection-query';

export async function getEducation(locale: Locale): Promise<Education[]> {
  return findCollection<Education>('education', locale);
}
