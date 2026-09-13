import { AdminHeaderSkeleton } from '@/features/admin/ui/admin-skeletons';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <AdminHeaderSkeleton />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[4/3] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
