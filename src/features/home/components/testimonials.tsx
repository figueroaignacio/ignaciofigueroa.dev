import type { Testimonial } from '@/payload-types';
import { Section } from '@/shared/components/ui/section';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTestimonials } from '../api/testimonials';
import { TestimonialsList } from './testimonials-list';

export async function Testimonials() {
  const t = await getTranslations('sections.testimonials');
  const locale = await getLocale();
  const testimonials: Testimonial[] = await getTestimonials(locale);

  return (
    <Section id="testimonials" title={t('title')}>
      <TestimonialsList
        testimonials={testimonials.map((t) => ({
          id: t.id,
          testimonial: t.testimonial,
          name: t.name,
          role: t.role,
        }))}
      />
    </Section>
  );
}
