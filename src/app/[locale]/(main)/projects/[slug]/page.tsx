import { getProjectBySlug, getProjects } from '@/features/projects/api/projects';
import { ProjectDetailView } from '@/features/projects/views/project-detail-view';
import type { Project } from '@/payload-types';
import { BASE_URL } from '@/shared/lib/constants';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return <ProjectDetailView slug={slug} />;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: 'Project not found' };

  const ogUrl = new URL(`${BASE_URL}/api/og/project`);
  ogUrl.searchParams.set('title', project.title);
  ogUrl.searchParams.set('description', project.description ?? '');
  ogUrl.searchParams.set('subtitle', project.subtitle ?? '');
  ogUrl.searchParams.set('slug', slug);

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        en: `${BASE_URL}/en/projects/${slug}`,
        es: `${BASE_URL}/es/projects/${slug}`,
        'x-default': `${BASE_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
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
          console.warn(`Failed to fetch posts for locale ${locale}:`, error);
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
