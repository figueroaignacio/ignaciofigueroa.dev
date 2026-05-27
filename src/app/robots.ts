import { BASE_URL } from '@/shared/lib/constants';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/(payload)/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
