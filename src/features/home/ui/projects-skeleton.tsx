import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

export function ProjectsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="flex gap-6 border-b border-border/40 pb-3 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </SectionSkeleton>
  );
}
