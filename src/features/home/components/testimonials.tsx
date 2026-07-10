import type { Testimonial } from '@/payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTestimonials } from '../api/testimonials';
import { TestimonialsList } from './testimonials-list';

export async function Testimonials() {
  const t = await getTranslations('sections.testimonials');
  const locale = await getLocale();
  const testimonials: Testimonial[] = await getTestimonials(locale);

  return (
    <section id="testimonials" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>
      <TestimonialsList
        testimonials={testimonials.map((t) => ({
          id: t.id,
          testimonial: t.testimonial,
          name: t.name,
          role: t.role,
        }))}
      />
    </section>
  );
}
