import { AssistantCoding } from '@/features/assistant/ui/assistant-coding';
import { SectionShell } from '@/shared/components/ui/section';
import { Skeleton } from '@/shared/components/ui/skeleton';

/**
 * Borrows `SectionShell` rather than re-stating its markup: a loading section
 * has to sit on the same column, at the same rhythm, under the same bleeding
 * rule as the section it stands in for.
 */
export function SectionSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <SectionShell
      busy
      className="relative"
      label={<Skeleton className="h-4 w-28" />}
      accessory={
        <div className="skeleton-bot" aria-hidden="true">
          <AssistantCoding />
        </div>
      }
    >
      {children}
    </SectionShell>
  );
}
