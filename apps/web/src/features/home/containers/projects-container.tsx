import { getProjectCategories } from '@/features/projects/api/categories';
import { getProjects } from '@/features/projects/api/projects';
import type { CategoryProjects } from '@/features/projects/ui/projects-tabs';
import { getLocale, getTranslations } from 'next-intl/server';
import { ProjectsWidget } from '../widgets/projects-widget';

const TAB_ORDER = ['frontend', 'backend', 'ai'];

export async function ProjectsContainer() {
  const [t, locale] = await Promise.all([getTranslations('sections.projects'), getLocale()]);
  const [categories, projects] = await Promise.all([getProjectCategories(), getProjects(locale)]);

  const ordered = [...categories].sort((a, b) => {
    const left = TAB_ORDER.indexOf(a.slug);
    const right = TAB_ORDER.indexOf(b.slug);
    return (left === -1 ? TAB_ORDER.length : left) - (right === -1 ? TAB_ORDER.length : right);
  });

  const data: CategoryProjects[] = ordered.map((category) => ({
    category: category.label,
    projects: projects.filter((project) =>
      project.categories.some((item) => item.id === category.id),
    ),
  }));

  return (
    <ProjectsWidget id="projects" title={t('title')} viewAllLabel={t('viewAll')} data={data} />
  );
}
