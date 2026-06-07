import { PersonalProjectsTab } from '@/features/projects/components/personal-projects';
import { getTranslations } from 'next-intl/server';

export async function ProjectsSection() {
  const t = await getTranslations('sections.projects');
  return (
    <section id="projects" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{t('title')}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t('description')}</p>
      </div>
      <div className="grid gap-4">
        <PersonalProjectsTab />
      </div>
    </section>
  );
}
