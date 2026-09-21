import { CardSkeleton } from '@/features/home/ui/card-skeleton';

export function ProjectsIndexSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true" aria-busy="true">
      <CardSkeleton titleWidth="w-44" lines={1} chips={5} />
      <CardSkeleton titleWidth="w-32" lines={1} chips={4} />
      <CardSkeleton titleWidth="w-48" lines={1} chips={6} />
      <CardSkeleton titleWidth="w-36" lines={1} chips={3} />
    </div>
  );
}
