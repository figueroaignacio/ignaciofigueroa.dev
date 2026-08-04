import { Section } from '@/shared/components/ui/section';
import { TestimonialsList } from '../ui/testimonials-list';
import { TestimonialsSkeleton } from '../ui/testimonials-skeleton';

export interface TestimonialItem {
  id: number;
  testimonial: string;
  name: string;
  role: string;
}

interface TestimonialsWidgetProps {
  id: string;
  title?: string;
  testimonials?: TestimonialItem[] | null;
}

export function TestimonialsWidget({ id, title = '', testimonials }: TestimonialsWidgetProps) {
  if (testimonials === undefined) return <TestimonialsSkeleton />;
  if (testimonials === null || testimonials.length === 0) return null;

  return (
    <Section id={id} title={title}>
      <TestimonialsList testimonials={testimonials} />
    </Section>
  );
}
