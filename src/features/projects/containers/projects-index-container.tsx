import { getLocale } from 'next-intl/server';
import { getProjects } from '../api/projects';
import { ProjectsIndexWidget } from '../widgets/projects-index-widget';

export async function ProjectsIndexContainer() {
  const locale = await getLocale();
  const projects = await getProjects(locale);

  return <ProjectsIndexWidget projects={projects} />;
}
