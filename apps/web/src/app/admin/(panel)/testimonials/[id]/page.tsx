import { getAdminTestimonial } from '@/features/admin/api/admin.server';
import { TestimonialForm } from '@/features/admin/ui/testimonials/testimonial-form';
import { ApiError } from '@/shared/lib/api-error';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function load(id: string) {
  try {
    return await getAdminTestimonial(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const testimonial = await load(id);
  return { title: testimonial.name };
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const testimonial = await load(id);
  return <TestimonialForm key={testimonial.id} testimonial={testimonial} />;
}
