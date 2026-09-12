import { apiPublic, toQuery } from '@/shared/lib/api-server';
import type { Project } from '@/shared/lib/content-types';
import type { Locale } from 'next-intl';

export async function getProjects(locale: Locale): Promise<Project[]> {
  return apiPublic<Project[]>(`/projects${toQuery({ locale })}`, { tags: ['projects'] });
}

export async function getCommercialProjects(locale: Locale): Promise<Project[]> {
  return apiPublic<Project[]>(`/projects${toQuery({ locale, commercial: true })}`, {
    tags: ['projects'],
  });
}

export async function getPersonalProjects(locale: Locale): Promise<Project[]> {
  return apiPublic<Project[]>(`/projects${toQuery({ locale, commercial: false })}`, {
    tags: ['projects'],
  });
}

export async function getProjectsByCategory(
  locale: Locale,
  categorySlug: string,
): Promise<Project[]> {
  return apiPublic<Project[]>(`/projects${toQuery({ locale, category: categorySlug })}`, {
    tags: ['projects'],
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiPublic<Project>(`/projects/${slug}`, { tags: ['projects', `project-${slug}`] });
  } catch {
    return null;
  }
}

/**
 * Slugs are unique across locales and the English and Spanish records of the
 * same project do not share one, so an alternate link can only be claimed after
 * checking that the counterpart actually exists.
 */
export async function getProjectSlugs(locale: Locale): Promise<string[]> {
  return apiPublic<string[]>(`/projects/slugs/${locale}`, { tags: ['projects'] });
}
