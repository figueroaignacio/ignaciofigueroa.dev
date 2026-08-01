import { getProjectsByCategory } from '@/features/projects/api/projects';
import type { CategoryProjects } from '@/features/projects/components/projects-tabs';
import { ProjectsTabs } from '@/features/projects/components/projects-tabs';
import type { Project } from '@/payload-types';
import { Section } from '@/shared/components/ui/section';
import { getLocale, getTranslations } from 'next-intl/server';

const CATEGORIES = ['Frontend', 'Backend', 'AI'] as const;

export async function ProjectsSection() {
  const [t, locale] = await Promise.all([getTranslations('sections.projects'), getLocale()]);

  const categoryData: CategoryProjects[] = await Promise.all(
    CATEGORIES.map(async (category) => {
      const projects: Project[] = await getProjectsByCategory(locale, category);
      return { category, projects };
    }),
  );

  return (
    <Section id="projects" title={t('title')}>
      <ProjectsTabs data={categoryData} />
    </Section>
  );
}
