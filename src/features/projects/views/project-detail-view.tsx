import { Suspense } from 'react';
import { ProjectDetailContainer } from '../containers/project-detail-container';
import { ProjectDetailSkeleton } from '../ui/project-detail-skeleton';

export function ProjectDetailView({ slug }: { slug: string }) {
  return (
    <div className="relative max-w-3xl mx-auto py-8">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[350px] w-full max-w-[600px] -translate-x-1/2 rounded-full bg-linear-to-tr from-primary/10 via-accent/5 to-transparent opacity-75 blur-[100px] dark:from-primary/15 dark:via-primary/5"
        aria-hidden="true"
      />
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContainer slug={slug} />
      </Suspense>
    </div>
  );
}
