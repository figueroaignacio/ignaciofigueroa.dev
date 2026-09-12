import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

export function GithubStatsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="mt-4 h-36 w-full" />
    </SectionSkeleton>
  );
}
