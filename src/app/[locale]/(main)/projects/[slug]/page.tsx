import { getProjectBySlug, getProjects } from '@/features/projects/api/projects';
import { ProjectHeaderPage } from '@/features/projects/components/project-header-page';
import { ProjectVideo } from '@/features/projects/components/project-video';
import type { Project } from '@/payload-types';
import { BASE_URL } from '@/shared/lib/constants';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

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
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative max-w-3xl mx-auto py-8">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[350px] w-full max-w-[600px] -translate-x-1/2 rounded-full bg-linear-to-tr from-primary/10 via-accent/5 to-transparent opacity-75 blur-[100px] dark:from-primary/15 dark:via-primary/5"
        aria-hidden="true"
      />

      <div className="animate-fade-in-up">
        <ProjectHeaderPage
          title={project.title}
          description={project.description}
          demo={project.demo || ''}
          repository={project.repository || ''}
          icon={project.icon as string}
          body={project.body}
          locale={project.locale}
        />
      </div>

      <div className="animate-fade-in-up delay-150 mt-4">
        <ProjectVideo videoUrl={project.videoUrl} />
      </div>

      <div className="animate-fade-in-up delay-300 mt-16 mb-24">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <RichText
            data={project.body}
            className="font-light leading-relaxed text-[16px] md:text-[17px] text-foreground/80 dark:text-foreground/85 prose-headings:font-normal prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:mb-5 prose-p:leading-8 prose-li:my-1.5 prose-code:bg-muted/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none"
          />
        </article>
      </div>
    </div>
  );
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
