import { getAdminTestimonials } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { EntityTable } from '@/features/admin/ui/entity-table';
import { DeleteTestimonialButton } from '@/features/admin/ui/testimonials/delete-testimonial-button';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'testimonials' };

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="testimonials"
        meta={`${testimonials.total} entries`}
        newHref="/admin/testimonials/new"
        newLabel="new testimonial"
      />
      <EntityTable
        rows={testimonials.items.map((item) => ({
          id: item.id,
          title: item.name,
          subtitle: item.role,
          locale: item.locale,
          status: item.status,
        }))}
        basePath="/admin/testimonials"
        emptyTitle="no testimonials yet"
        emptyDescription="quotes from people you worked with."
        actions={(row) => <DeleteTestimonialButton id={row.id} name={row.title} />}
      />
    </div>
  );
}
