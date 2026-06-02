import { CommercialProjectsTab } from '@/features/projects/components/commercial-projects';
import { PersonalProjectsTab } from '@/features/projects/components/personal-projects';
import { ProjectsTabs } from '@/features/projects/components/projects-tabs';
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
        <ProjectsTabs work={<CommercialProjectsTab />} personal={<PersonalProjectsTab />} />
      </div>
    </section>
  );
}
