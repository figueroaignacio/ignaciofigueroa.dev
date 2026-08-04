import { Skeleton } from '@/shared/components/ui/skeleton';

export function SectionSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <section aria-hidden aria-busy="true">
      <div className="mb-8">
        <Skeleton className="h-4 w-28" />
        <div className="mt-3 flex h-px" aria-hidden="true">
          <span className="w-8 bg-foreground/25" />
          <span className="flex-1 bg-rule" />
        </div>
      </div>
      {children}
    </section>
  );
}
