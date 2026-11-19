import { getTestimonials } from '@/features/home/api/testimonials';
import type { Locale } from 'next-intl';
import { DeskObjectLayer } from './desk-object-layer';

export async function DeskObjects({ locale }: { locale: Locale }) {
  const testimonials = await getTestimonials(locale).catch(() => []);

  return (
    <DeskObjectLayer
      testimonials={testimonials.map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        company: item.company,
        testimonial: item.testimonial,
        avatar: item.avatar,
        url: item.url,
      }))}
    />
  );
}
