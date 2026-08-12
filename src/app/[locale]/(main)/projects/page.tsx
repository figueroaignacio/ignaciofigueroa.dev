import { getProjects } from '@/features/projects/api/projects';
import { ProjectsIndexView } from '@/features/projects/views/projects-index-view';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/shared/lib/constants';
import {
  buildBreadcrumbNode,
  buildWebPageNode,
  jsonLdGraph,
  personRef,
  PERSON_ID,
} from '@/shared/lib/schema';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tHome, projects] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.projects' }),
    getTranslations({ locale, namespace: 'metadata.home' }),
    getProjects(locale),
  ]);

  const url = `${BASE_URL}/${locale}/projects`;
  const breadcrumbId = `${url}#breadcrumb`;

  const lastModified = projects
    .map((project) => Date.parse(project.updatedAt))
    .filter((value) => Number.isFinite(value));

  const jsonLd = jsonLdGraph([
    personRef(locale),
    buildBreadcrumbNode(breadcrumbId, [
      { name: tHome('ogTitle'), url: `${BASE_URL}/${locale}` },
      { name: t('heading'), url },
    ]),
    buildWebPageNode({
      url,
      name: t('ogTitle'),
      description: t('description'),
      locale,
      type: 'CollectionPage',
      breadcrumbId,
      ...(lastModified.length
        ? { dateModified: new Date(Math.max(...lastModified)).toISOString() }
        : {}),
      extra: {
        author: { '@id': PERSON_ID },
        hasPart: projects.map((project) => ({
          '@type': 'SoftwareApplication',
          '@id': `${BASE_URL}/${locale}/projects/${project.slug}#project`,
          name: project.title,
          url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        })),
      },
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsIndexView />
    </>
  );
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.projects' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: `${BASE_URL}/en/projects`,
        es: `${BASE_URL}/es/projects`,
        'x-default': `${BASE_URL}/en/projects`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('description'),
      url: `/${locale}/projects`,
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      siteName: 'Ignacio Figueroa',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
  };
}
