import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { ProjectsIndexContainer } from '../containers/projects-index-container';
import { ProjectsIndexSkeleton } from '../ui/projects-index-skeleton';

export async function ProjectsIndexView() {
  const t = await getTranslations('metadata.projects');

  return (
    <div className="frame-column pt-12 pb-10 md:pt-16">
      <header className="mb-8">
        <h1 className="type-display text-foreground">{t('heading')}</h1>
        <div className="prose-reading mt-4">
          <p>{t('intro')}</p>
        </div>
      </header>
      <Suspense fallback={<ProjectsIndexSkeleton />}>
        <ProjectsIndexContainer />
      </Suspense>
    </div>
  );
}
