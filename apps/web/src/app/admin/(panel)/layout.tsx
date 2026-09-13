import {
  getAdminContributions,
  getAdminEducation,
  getAdminExperiences,
  getAdminMedia,
  getAdminProjects,
  getAdminTestimonials,
} from '@/features/admin/api/admin.server';
import { AdminSidebar } from '@/features/admin/ui/admin-sidebar';
import { getCurrentUser } from '@/features/auth/api/current-user';
import { redirect } from 'next/navigation';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const [projects, experiences, education, testimonials, contributions, media] = await Promise.all([
    getAdminProjects({ limit: 1 }),
    getAdminExperiences({ limit: 1 }),
    getAdminEducation({ limit: 1 }),
    getAdminTestimonials({ limit: 1 }),
    getAdminContributions({ limit: 1 }),
    getAdminMedia(),
  ]);

  return (
    <div className="flex min-h-screen flex-col md:pl-64">
      <AdminSidebar
        email={user.email}
        counts={{
          projects: projects.total,
          experiences: experiences.total,
          education: education.total,
          testimonials: testimonials.total,
          contributions: contributions.total,
          media: media.length,
        }}
      />
      <main className="flex flex-1 flex-col px-5 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
