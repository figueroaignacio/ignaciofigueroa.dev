import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Timeline,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from '@/shared/components/ui/timeline';
import { SectionSkeleton } from './section-skeleton';

const ENTRIES = [
  { bullets: 4, chips: 6 },
  { bullets: 3, chips: 4 },
];

export function TimelineSkeleton() {
  return (
    <SectionSkeleton>
      <Timeline value={0} className="ml-1">
        {ENTRIES.map((entry, index) => (
          <TimelineItem key={index} step={index + 1} className="ps-6 pb-8 last:pb-0">
            <TimelineIndicator className="top-2 left-0 size-2 border" />
            <TimelineSeparator className="top-2 left-0" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            <ul className="mt-3 space-y-2 pl-4">
              {Array.from({ length: entry.bullets }).map((_, line) => (
                <Skeleton key={line} className={`h-3.5 ${line % 2 ? 'w-5/6' : 'w-full'}`} />
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Array.from({ length: entry.chips }).map((_, chip) => (
                <Skeleton
                  key={chip}
                  className="h-6 rounded-full"
                  style={{ width: `${3.5 + ((chip * 5) % 3)}rem` }}
                />
              ))}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionSkeleton>
  );
}
