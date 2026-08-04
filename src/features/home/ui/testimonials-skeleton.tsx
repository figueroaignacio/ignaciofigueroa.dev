import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

export function TestimonialsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    </SectionSkeleton>
  );
}
