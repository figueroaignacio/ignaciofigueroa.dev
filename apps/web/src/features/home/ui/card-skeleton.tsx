import { Frame } from '@/shared/components/ui/frame';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface CardSkeletonProps {
  titleWidth?: string;
  lines?: number;
  chips?: number;
}

export function CardSkeleton({ titleWidth = 'w-40', lines = 2, chips = 4 }: CardSkeletonProps) {
  return (
    <Frame>
      <Frame.Header className="px-2.5 py-2 flex-row items-center justify-between gap-6">
        <Skeleton className={`h-4 ${titleWidth}`} />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </Frame.Header>
      <Frame.Panel className="bg-background space-y-3">
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton key={index} className={`h-3.5 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
        {chips > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {Array.from({ length: chips }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-6 rounded-full"
                style={{ width: `${3.5 + ((index * 7) % 3)}rem` }}
              />
            ))}
          </div>
        )}
      </Frame.Panel>
    </Frame>
  );
}
