import { Frame } from '@/shared/components/ui/frame';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

function ContributionSkeleton({ prs }: { prs: number }) {
  return (
    <Frame>
      <Frame.Header className="flex-row items-center justify-between gap-6">
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-12" />
        </div>
      </Frame.Header>
      <Frame.Panel className="bg-background space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>
        <div className="max-w-md space-y-2 pl-4">
          {Array.from({ length: prs }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-full" />
          ))}
        </div>
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </Frame.Panel>
    </Frame>
  );
}

export function ContributionsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="space-y-4">
        <ContributionSkeleton prs={3} />
        <ContributionSkeleton prs={1} />
      </div>
    </SectionSkeleton>
  );
}
