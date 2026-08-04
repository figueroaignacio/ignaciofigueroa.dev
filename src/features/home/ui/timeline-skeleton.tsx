import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

export function TimelineSkeleton() {
  return (
    <SectionSkeleton>
      <ol className="relative ml-1 space-y-10 border-l border-border pl-6">
        {[0, 1].map((i) => (
          <li key={i} className="relative space-y-3">
            <span
              aria-hidden
              className="absolute top-2 left-[-28.5px] size-2 rounded-full border border-border bg-background"
            />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
          </li>
        ))}
      </ol>
    </SectionSkeleton>
  );
}
