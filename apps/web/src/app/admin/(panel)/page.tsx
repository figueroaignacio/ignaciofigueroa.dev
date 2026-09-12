import { getAdminProjects } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { ProjectTable } from '@/features/admin/ui/projects/project-table';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'projects' };

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  const published = projects.items.filter((project) => project.status === 'published').length;

  return (
    <div className="flex flex-col gap-5">
      <AdminPageHeader
        title="projects"
        meta={`${projects.total} total · ${published} published`}
        newHref="/admin/projects/new"
        newLabel="new project"
      />
      <ProjectTable projects={projects.items} />
    </div>
  );
}
