import { apiPublic } from '@/shared/lib/api-server';
import type { ProjectCategory } from '@/shared/lib/content-types';

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  return apiPublic<ProjectCategory[]>('/project-categories', { tags: ['projects'] });
}
