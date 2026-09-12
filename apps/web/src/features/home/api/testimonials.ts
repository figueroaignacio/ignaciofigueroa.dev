import { apiPublic, toQuery } from '@/shared/lib/api-server';
import type { Testimonial } from '@/shared/lib/content-types';
import type { Locale } from 'next-intl';

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  return apiPublic<Testimonial[]>(`/testimonials${toQuery({ locale })}`, {
    tags: ['testimonials'],
  });
}
