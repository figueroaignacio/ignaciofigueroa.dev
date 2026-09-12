import { getAdminContributions } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { DeleteContributionButton } from '@/features/admin/ui/contributions/delete-contribution-button';
import { EntityTable } from '@/features/admin/ui/entity-table';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'contributions' };

export default async function AdminContributionsPage() {
  const contributions = await getAdminContributions();

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="contributions"
        meta={`${contributions.total} entries`}
        newHref="/admin/contributions/new"
        newLabel="new contribution"
      />
      <EntityTable
        rows={contributions.items.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: `${item.pullRequests.length} prs`,
          locale: item.locale,
          status: item.status,
        }))}
        basePath="/admin/contributions"
        emptyTitle="no contributions yet"
        emptyDescription="open source work you want to show."
        actions={(row) => <DeleteContributionButton id={row.id} title={row.title} />}
      />
    </div>
  );
}
