import { AssistantCoding } from '@/features/assistant/ui/assistant-coding';
import { SectionShell } from '@/shared/components/ui/section';
import { Skeleton } from '@/shared/components/ui/skeleton';

/**
 * Borrows `SectionShell` rather than re-stating its markup: a loading section
 * has to sit on the same column, at the same rhythm, under the same bleeding
 * rule as the section it stands in for.
 *
 * The bot fetching it goes in as an accessory, which is the one slot here that
 * is positioned out of flow — anything in the flow would change the height the
 * skeleton exists to reserve, and the section would jump when the data lands.
 * It sits in the bottom padding, where the bars never reach.
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
