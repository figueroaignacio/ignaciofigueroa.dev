import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProjectsIndexSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
