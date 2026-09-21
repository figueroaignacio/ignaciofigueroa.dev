import { CardSkeleton } from './card-skeleton';
import { SectionSkeleton } from './section-skeleton';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProjectsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="mb-6 flex gap-6 border-b border-rule pb-3">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-8" />
      </div>
      <div className="space-y-4">
        <CardSkeleton titleWidth="w-44" lines={1} chips={5} />
        <CardSkeleton titleWidth="w-32" lines={1} chips={4} />
        <CardSkeleton titleWidth="w-40" lines={1} chips={3} />
      </div>
    </SectionSkeleton>
  );
}
