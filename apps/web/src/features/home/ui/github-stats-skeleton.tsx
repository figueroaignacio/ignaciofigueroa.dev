import { Frame } from '@/shared/components/ui/frame';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { SectionSkeleton } from './section-skeleton';

const WEEKS = 26;

export function GithubStatsSkeleton() {
  return (
    <SectionSkeleton>
      <div className="space-y-6">
        <div className="space-y-5">
          <div className="max-w-xl space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-14 rounded-full" />
            <Skeleton className="h-7 w-14 rounded-full" />
            <Skeleton className="h-7 w-14 rounded-full" />
          </div>
        </div>

        <Frame>
          <Frame.Header className="flex-row items-center justify-between gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="size-6 rounded-md" />
          </Frame.Header>
          <Frame.Panel className="bg-background">
            <Skeleton className="h-6 w-16" />
          </Frame.Panel>
        </Frame>

        <div className="space-y-4 rounded-xl border border-border/50 bg-secondary/10 p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-36" />
          </div>
          <div className="overflow-hidden pt-2">
            <div className="grid grid-flow-col grid-rows-7 gap-0.75 auto-cols-max">
              {Array.from({ length: WEEKS * 7 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="size-2.5 rounded-xs"
                  style={{ opacity: 0.35 + ((index * 37) % 5) * 0.13 }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-5 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </SectionSkeleton>
  );
}
