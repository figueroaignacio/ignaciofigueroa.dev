import {
  getAdminCategories,
  getAdminLabels,
  getAdminTechIcons,
  getAdminTechStack,
} from '@/features/admin/api/admin.server';
import { AdminPageHeader } from '@/features/admin/ui/admin-page-header';
import { TaxonomyPanels } from '@/features/admin/ui/taxonomy/taxonomy-panels';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'taxonomy' };

export default async function AdminTaxonomyPage() {
  const [categories, labels, technologies, icons] = await Promise.all([
    getAdminCategories(),
    getAdminLabels(),
    getAdminTechStack(),
    getAdminTechIcons(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="library"
        title="taxonomy"
        meta={`${categories.length} categories · ${technologies.length} technologies`}
      />
      <TaxonomyPanels
        categories={categories}
        labels={labels}
        technologies={technologies}
        icons={icons}
      />
    </div>
  );
}
