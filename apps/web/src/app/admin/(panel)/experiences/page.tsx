import { getAdminExperiences } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { EntityTable } from '@/features/admin/ui/entity-table';
import { DeleteExperienceButton } from '@/features/admin/ui/experiences/delete-experience-button';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'experience' };

export default async function AdminExperiencesPage() {
  const experiences = await getAdminExperiences();

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="experience"
        meta={`${experiences.total} entries`}
        newHref="/admin/experiences/new"
        newLabel="new role"
      />
      <EntityTable
        rows={experiences.items.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.company,
          locale: item.locale,
          status: item.status,
        }))}
        basePath="/admin/experiences"
        emptyTitle="no roles yet"
        emptyDescription="add the first one and it shows up here."
        actions={(row) => <DeleteExperienceButton id={row.id} title={row.title} />}
      />
    </div>
  );
}
