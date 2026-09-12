import { TestimonialForm } from '@/features/admin/ui/testimonials/testimonial-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'new testimonial' };

export default function NewTestimonialPage() {
  return <TestimonialForm />;
}
