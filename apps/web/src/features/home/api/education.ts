import { apiPublic, toQuery } from '@/shared/lib/api-server';
import type { Education } from '@/shared/lib/content-types';
import type { Locale } from 'next-intl';

export async function getEducation(locale: Locale): Promise<Education[]> {
  return apiPublic<Education[]>(`/education${toQuery({ locale })}`, { tags: ['education'] });
}
