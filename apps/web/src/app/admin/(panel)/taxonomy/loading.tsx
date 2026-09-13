import { AdminHeaderSkeleton } from '@/features/admin/ui/admin-skeletons';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <AdminHeaderSkeleton />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
