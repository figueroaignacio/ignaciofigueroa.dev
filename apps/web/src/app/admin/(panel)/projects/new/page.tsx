import {
  getAdminCategories,
  getAdminLabels,
  getAdminMedia,
  getAdminTechStack,
} from '@/features/admin/api/admin.server';
import { ProjectEditor } from '@/features/admin/ui/projects/project-editor';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'new project' };

export default async function NewProjectPage() {
  const [technologies, categories, labels, media] = await Promise.all([
    getAdminTechStack(),
    getAdminCategories(),
    getAdminLabels(),
    getAdminMedia(),
  ]);

  return (
    <ProjectEditor
      technologies={technologies}
      categories={categories}
      labels={labels}
      media={media}
    />
  );
}
