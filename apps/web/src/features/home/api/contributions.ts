import { apiPublic, toQuery } from '@/shared/lib/api-server';
import type { Contribution } from '@/shared/lib/content-types';
import type { Locale } from 'next-intl';

export async function getContributions(locale: Locale): Promise<Contribution[]> {
  return apiPublic<Contribution[]>(`/contributions${toQuery({ locale })}`, {
    tags: ['contributions'],
  });
}
