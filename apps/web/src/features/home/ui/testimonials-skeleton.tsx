import { Frame } from '@/shared/components/ui/frame';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

function TestimonialSkeleton({ lines }: { lines: number }) {
  return (
    <Frame>
      <Frame.Panel className="bg-background space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className={`h-3.5 ${index === lines - 1 ? 'w-1/2' : 'w-full'}`} />
        ))}
      </Frame.Panel>
      <Frame.Footer>
        <Skeleton className="h-3 w-44" />
      </Frame.Footer>
    </Frame>
  );
}

export function TestimonialsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="flex flex-col gap-y-4">
        <TestimonialSkeleton lines={3} />
        <TestimonialSkeleton lines={4} />
      </div>
    </SectionSkeleton>
  );
}
