import { Skeleton } from '@/shared/components/ui/skeleton';

export function ProjectDetailSkeleton() {
  return (
    <div aria-hidden="true" aria-busy="true">
      <header className="mb-8 flex w-full flex-col items-start border-b border-border/40 pt-2 pb-6">
        <Skeleton className="mb-6 h-3 w-16" />
        <Skeleton className="h-7 w-2/3 max-w-md" />
        <div className="mt-4 max-w-2xl space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Skeleton className="h-3 w-8" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-14" />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </header>
      <Skeleton className="mt-4 aspect-video w-full rounded-xl" />
      <div className="mt-10 mb-24 space-y-3">
        <Skeleton className="mb-5 h-4 w-40" />
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className={`h-3.5 ${index % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}
