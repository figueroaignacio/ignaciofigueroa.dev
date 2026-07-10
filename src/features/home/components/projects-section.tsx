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
    <section id="projects" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>
      <ProjectsTabs data={categoryData} />
    </section>
  );
}
