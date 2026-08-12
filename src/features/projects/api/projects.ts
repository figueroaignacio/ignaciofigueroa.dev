import { findCollection, findOneBySlug } from '@/shared/lib/collection-query';
import type { Project } from '@/payload-types';
import { Locale } from 'next-intl';

export async function getProjects(locale: Locale): Promise<Project[]> {
  return findCollection<Project>('projects', locale);
}

export async function getCommercialProjects(locale: Locale): Promise<Project[]> {
  return findCollection<Project>('projects', locale, {
    where: { isCommercialProject: { equals: true } },
  });
}

export async function getPersonalProjects(locale: Locale): Promise<Project[]> {
  return findCollection<Project>('projects', locale, {
    where: { isCommercialProject: { equals: false } },
  });
}

export async function getProjectsByCategory(
  locale: Locale,
  categorySlug: string,
): Promise<Project[]> {
  return findCollection<Project>('projects', locale, {
    where: { 'category.label': { equals: categorySlug } },
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return findOneBySlug<Project>('projects', slug);
}

/**
 * Slugs are unique across locales and the English and Spanish records of the
 * same project do not share one, so an alternate link can only be claimed after
 * checking that the counterpart actually exists.
 */
export async function getProjectSlugs(locale: Locale): Promise<string[]> {
  const projects = await getProjects(locale);
  return projects.map((project) => project.slug).filter(Boolean);
}
