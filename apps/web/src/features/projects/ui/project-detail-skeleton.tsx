import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProjectDetailSkeleton() {
  return (
    <div aria-hidden aria-busy="true" className="space-y-6">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-full max-w-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-64 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
