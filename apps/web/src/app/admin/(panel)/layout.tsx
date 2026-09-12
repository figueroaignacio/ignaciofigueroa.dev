import { getCurrentUser } from '@/features/auth/api/current-user';
import { AdminHeader } from '@/features/admin/ui/admin-header';
import { redirect } from 'next/navigation';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-10">
      <AdminHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
