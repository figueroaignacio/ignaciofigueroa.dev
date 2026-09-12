import { apiPublic, toQuery } from '@/shared/lib/api-server';
import type { Experience } from '@/shared/lib/content-types';
import type { Locale } from 'next-intl';

export async function getExperiences(locale: Locale): Promise<Experience[]> {
  return apiPublic<Experience[]>(`/experiences${toQuery({ locale })}`, { tags: ['experiences'] });
}
