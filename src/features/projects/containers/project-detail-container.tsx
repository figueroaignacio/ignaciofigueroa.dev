import { notFound } from 'next/navigation';
import { getProjectBySlug } from '../api/projects';
import { ProjectDetailWidget } from '../widgets/project-detail-widget';

export async function ProjectDetailContainer({ slug }: { slug: string }) {
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailWidget project={project} />;
}
