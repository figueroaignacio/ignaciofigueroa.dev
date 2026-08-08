import { Suspense } from 'react';
import { ProjectDetailContainer } from '../containers/project-detail-container';
import { ProjectDetailSkeleton } from '../ui/project-detail-skeleton';

export function ProjectDetailView({ slug }: { slug: string }) {
  return (
    /* Same measure as before, now expressed by the frame's column token. */
    <div className="frame-column pt-16 pb-14 md:pt-20">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContainer slug={slug} />
      </Suspense>
    </div>
  );
}
