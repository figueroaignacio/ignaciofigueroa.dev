import { getProjectsByCategory } from '@/features/projects/api/projects';
import type { CategoryProjects } from '@/features/projects/components/projects-tabs';
import { ProjectsTabs } from '@/features/projects/components/projects-tabs';
import type { Project } from '@/payload-types';
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
    <section id="projects" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{t('title')}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t('description')}</p>
      </div>
      <ProjectsTabs data={categoryData} />
    </section>
  );
}
