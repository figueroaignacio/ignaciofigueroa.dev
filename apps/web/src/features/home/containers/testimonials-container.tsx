import { getLocale, getTranslations } from 'next-intl/server';
import { getTestimonials } from '../api/testimonials';
import { TestimonialsWidget, type TestimonialItem } from '../widgets/testimonials-widget';

export async function TestimonialsContainer() {
  const t = await getTranslations('sections.testimonials');
  const locale = await getLocale();
  const testimonials = await getTestimonials(locale);

  const items: TestimonialItem[] = testimonials.map((testimonial) => ({
    id: testimonial.id,
    testimonial: testimonial.testimonial,
    name: testimonial.name,
    role: testimonial.role,
  }));

  return <TestimonialsWidget id="testimonials" title={t('title')} testimonials={items} />;
}
