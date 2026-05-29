import { getProjects } from '@/features/projects/api/projects';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/shared/lib/constants';
import type { MetadataRoute } from 'next';

const staticRoutes = [''];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date('2026-05-04'),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            es: `${BASE_URL}/es${route}`,
            'x-default': `${BASE_URL}/en${route}`,
          },
        },
      });
    }
  }

  for (const locale of routing.locales) {
    try {
      const projects = await getProjects(locale as 'en' | 'es');

      for (const project of projects) {
        if (!project.slug) continue;
        entries.push({
          url: `${BASE_URL}/${locale}/projects/${project.slug}`,
          lastModified: new Date(project.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              en: `${BASE_URL}/en/projects/${project.slug}`,
              es: `${BASE_URL}/es/projects/${project.slug}`,
              'x-default': `${BASE_URL}/en/projects/${project.slug}`,
            },
          },
        });
      }
    } catch (error) {
      console.warn(`Sitemap: failed to fetch projects for ${locale}:`, error);
    }
  }

  return entries;
}
