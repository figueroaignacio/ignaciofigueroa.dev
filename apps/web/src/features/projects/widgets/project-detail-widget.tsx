import { Link } from '@/i18n/navigation';
import { Markdown } from '@/shared/components/markdown';
import type { Project } from '@/shared/lib/content-types';
import { videoPoster } from '@/shared/lib/video-poster';
import { getTranslations } from 'next-intl/server';
import { ProjectDetailSkeleton } from '../ui/project-detail-skeleton';
import { ProjectHeaderPage } from '../ui/project-header-page';
import { ProjectVideo } from '../ui/project-video';

export async function ProjectDetailWidget({
  project,
  next,
}: {
  project?: Project | null;
  next?: Project | null;
}) {
  if (project === undefined) return <ProjectDetailSkeleton />;
  if (project === null) return null;

  const t = await getTranslations('components.projectItem');
  const nextLabels = (next?.labels ?? []).map((item) => item.label).slice(0, 2);

  return (
    <>
      <div className="animate-fade-in-up">
        <ProjectHeaderPage
          slug={project.slug}
          title={project.title}
          subtitle={project.subtitle}
          description={project.description}
          demo={project.demo || ''}
          repository={project.repository || ''}
          body={project.body}
          locale={project.locale}
          technologies={project.technologies}
          labels={project.labels}
        />
      </div>

      {project.videoUrl && (
        <div className="animate-fade-in-up delay-150 relative left-1/2 mt-14 w-[min(65rem,calc(100vw-2rem))] -translate-x-1/2">
          <ProjectVideo
            videoUrl={project.videoUrl}
            poster={videoPoster(project.videoUrl)}
            className="my-0 rounded-[14px] border-border bg-(--stage) shadow-none ring-0"
          />
        </div>
      )}

      <article className="case-body animate-fade-in-up delay-300 mt-20">
        <Markdown>{project.body}</Markdown>
      </article>

      {next && (
        <nav aria-label={t('next')} className="mt-24 mb-16 border-t border-border">
          <p className="pt-5 font-mono text-xs text-muted-foreground">./{t('next')}</p>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex min-h-11 items-baseline justify-between gap-6 py-3"
          >
            <span className="flex min-w-0 items-baseline gap-3 text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-brand md:text-[32px]">
              <span aria-hidden="true" className="size-2.5 shrink-0 bg-brand" />
              {next.title}
            </span>
            <span className="shrink-0 text-[15px] text-muted-foreground">
              <span className="hidden sm:inline">{nextLabels.join(' · ')} </span>→
            </span>
          </Link>
        </nav>
      )}
    </>
  );
}
