import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

export function NachUiCtaSkeleton() {
  return (
    <SectionSkeleton>
      <Skeleton className="h-48 w-full" />
    </SectionSkeleton>
  );
}
