import { getProjectsByCategory } from '@/features/projects/api/projects';
import type { CategoryProjects } from '@/features/projects/ui/projects-tabs';
import type { Project } from '@/payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { ProjectsWidget } from '../widgets/projects-widget';

const CATEGORIES = ['Frontend', 'Backend', 'AI'] as const;

export async function ProjectsContainer() {
  const [t, locale] = await Promise.all([getTranslations('sections.projects'), getLocale()]);

  const data: CategoryProjects[] = await Promise.all(
    CATEGORIES.map(async (category) => {
      const projects: Project[] = await getProjectsByCategory(locale, category);
      return { category, projects };
    }),
  );

  return <ProjectsWidget id="projects" title={t('title')} data={data} />;
}
