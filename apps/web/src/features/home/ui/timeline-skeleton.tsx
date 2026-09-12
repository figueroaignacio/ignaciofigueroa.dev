import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Timeline,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from '@/shared/components/ui/timeline';
import { SectionSkeleton } from './section-skeleton';

export function TimelineSkeleton() {
  return (
    <SectionSkeleton>
      <Timeline value={0} className="ml-1">
        {[1, 2].map((step) => (
          <TimelineItem key={step} step={step} className="ps-6 pb-10 last:pb-0 gap-3">
            <TimelineIndicator className="top-2 left-0 size-2 border" />
            <TimelineSeparator className="top-2 left-0" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
          </TimelineItem>
        ))}
      </Timeline>
    </SectionSkeleton>
  );
}
