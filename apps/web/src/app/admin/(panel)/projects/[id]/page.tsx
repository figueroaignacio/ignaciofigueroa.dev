import {
  getAdminCategories,
  getAdminLabels,
  getAdminMedia,
  getAdminProject,
  getAdminTechStack,
} from '@/features/admin/api/admin.server';
import { ProjectEditor } from '@/features/admin/ui/projects/project-editor';
import { ApiError } from '@/shared/lib/api-error';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function loadProject(id: string) {
  try {
    return await getAdminProject(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await loadProject(id);
  return { title: project.title || 'untitled' };
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const [project, technologies, categories, labels, media] = await Promise.all([
    loadProject(id),
    getAdminTechStack(),
    getAdminCategories(),
    getAdminLabels(),
    getAdminMedia(),
  ]);

  return (
    <ProjectEditor
      key={project.id}
      project={project}
      technologies={technologies}
      categories={categories}
      labels={labels}
      media={media}
    />
  );
}
