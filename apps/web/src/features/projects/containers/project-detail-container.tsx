import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '../api/projects';
import { ProjectDetailWidget } from '../widgets/project-detail-widget';

export async function ProjectDetailContainer({ slug }: { slug: string }) {
  const locale = await getLocale();
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(locale).catch(() => []),
  ]);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects.length > 1 && index !== -1 ? projects[(index + 1) % projects.length] : null;

  return <ProjectDetailWidget project={project} next={next} />;
}
