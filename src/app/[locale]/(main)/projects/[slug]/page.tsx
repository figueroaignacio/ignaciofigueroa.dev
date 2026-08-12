import { getProjectBySlug, getProjects, getProjectSlugs } from '@/features/projects/api/projects';
import { ProjectDetailView } from '@/features/projects/views/project-detail-view';
import type { Project, TechStack } from '@/payload-types';
import { BASE_URL } from '@/shared/lib/constants';
import {
  buildBreadcrumbNode,
  buildWebPageNode,
  buildWebSiteNode,
  jsonLdGraph,
  personRef,
  PERSON_ID,
} from '@/shared/lib/schema';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { permanentRedirect } from 'next/navigation';

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

async function resolveProject(slug: string, locale: Locale): Promise<Project> {
  const project = await getProjectBySlug(slug);

  if (!project) {
    permanentRedirect(`/${locale}/projects`);
  }

  if (project.locale !== locale) {
    permanentRedirect(`/${project.locale}/projects/${slug}`);
  }

  return project;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  const project = await resolveProject(slug, locale);

  const url = `${BASE_URL}/${locale}/projects/${slug}`;
  const breadcrumbId = `${url}#breadcrumb`;

  const technologies = (project.technologies ?? [])
    .filter((tech): tech is TechStack => typeof tech === 'object' && tech !== null)
    .map((tech) => tech.name)
    .filter(Boolean);

  const jsonLd = jsonLdGraph([
    personRef(locale),
    buildWebSiteNode(locale),
    buildBreadcrumbNode(breadcrumbId, [
      { name: 'Ignacio Figueroa', url: `${BASE_URL}/${locale}` },
      { name: locale === 'es' ? 'Proyectos' : 'Projects', url: `${BASE_URL}/${locale}/projects` },
      { name: project.title, url },
    ]),
    {
      '@type': 'SoftwareApplication',
      '@id': `${url}#project`,
      name: project.title,
      description: project.description,
      abstract: project.subtitle,
      url: project.demo || url,
      applicationCategory: 'DeveloperApplication',
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      inLanguage: locale === 'es' ? 'es-AR' : 'en',
      datePublished: project.createdAt,
      dateModified: project.updatedAt,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      ...(technologies.length ? { programmingLanguage: technologies } : {}),
      ...(project.repository ? { codeRepository: project.repository } : {}),
    },
    buildWebPageNode({
      url,
      name: project.title,
      description: project.description,
      locale,
      breadcrumbId,
      datePublished: project.createdAt,
      dateModified: project.updatedAt,
      extra: {
        mainEntity: { '@id': `${url}#project` },
        author: { '@id': PERSON_ID },
      },
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailView slug={slug} />
    </>
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.locale !== locale) return { title: 'Project not found' };

  const ogUrl = new URL(`${BASE_URL}/api/og/project`);
  ogUrl.searchParams.set('title', project.title);
  ogUrl.searchParams.set('description', project.description ?? '');
  ogUrl.searchParams.set('subtitle', project.subtitle ?? '');
  ogUrl.searchParams.set('slug', slug);

  const [enSlugs, esSlugs] = await Promise.all([getProjectSlugs('en'), getProjectSlugs('es')]);
  const languages: Record<string, string> = {};
  if (enSlugs.includes(slug)) languages.en = `${BASE_URL}/en/projects/${slug}`;
  if (esSlugs.includes(slug)) languages.es = `${BASE_URL}/es/projects/${slug}`;
  languages['x-default'] = languages.en ?? languages.es ?? `${BASE_URL}/${locale}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: [BASE_URL],
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      url: `/${locale}/projects/${slug}`,
      siteName: 'Ignacio Figueroa',
      images: [{ url: ogUrl.toString(), width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogUrl.toString()],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export async function generateStaticParams() {
  try {
    const locales: Locale[] = ['es', 'en'];
    const allProjects = await Promise.all(
      locales.map(async (locale) => {
        try {
          return await getProjects(locale);
        } catch (error) {
          console.warn(`Failed to fetch projects for locale ${locale}:`, error);
          return [];
        }
      }),
    );

    const params: { slug: string; locale: Locale }[] = [];

    locales.forEach((locale, i) => {
      allProjects[i].forEach((project: Project) => {
        if (project?.slug) {
          params.push({ slug: project.slug, locale });
        }
      });
    });

    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}
