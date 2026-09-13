import { getAdminMedia } from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { MediaLibrary } from '@/features/admin/ui/media/media-library';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'media' };

export default async function AdminMediaPage() {
  const media = await getAdminMedia();

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader eyebrow="library" title="media" meta={`${media.length} files`} />
      <MediaLibrary media={media} />
    </div>
  );
}
