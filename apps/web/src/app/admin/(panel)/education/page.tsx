import { getAdminEducation } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { DeleteEducationButton } from '@/features/admin/ui/education/delete-education-button';
import { EntityTable } from '@/features/admin/ui/entity-table';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'education' };

export default async function AdminEducationPage() {
  const education = await getAdminEducation();

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="education"
        meta={`${education.total} entries`}
        newHref="/admin/education/new"
        newLabel="new entry"
      />
      <EntityTable
        rows={education.items.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.institution,
          locale: item.locale,
          status: item.status,
        }))}
        basePath="/admin/education"
        emptyTitle="no entries yet"
        emptyDescription="degrees and certifications live here."
        actions={(row) => <DeleteEducationButton id={row.id} title={row.title} />}
      />
    </div>
  );
}
