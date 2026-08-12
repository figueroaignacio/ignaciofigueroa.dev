import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { ProjectsIndexContainer } from '../containers/projects-index-container';
import { ProjectsIndexSkeleton } from '../ui/projects-index-skeleton';

export async function ProjectsIndexView() {
  const t = await getTranslations('metadata.projects');

  return (
    <div className="frame-column pt-16 pb-14 md:pt-20">
      <header className="mb-10">
        <h1 className="type-display text-foreground">{t('heading')}</h1>
        <div className="prose-reading mt-5">
          <p>{t('intro')}</p>
        </div>
      </header>
      <Suspense fallback={<ProjectsIndexSkeleton />}>
        <ProjectsIndexContainer />
      </Suspense>
    </div>
  );
}
