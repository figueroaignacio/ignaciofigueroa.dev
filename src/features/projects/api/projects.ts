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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return findOneBySlug<Project>('projects', slug);
}
