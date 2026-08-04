import type { Project } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ProjectDetailSkeleton } from '../ui/project-detail-skeleton';
import { ProjectHeaderPage } from '../ui/project-header-page';
import { ProjectVideo } from '../ui/project-video';

export function ProjectDetailWidget({ project }: { project?: Project | null }) {
  if (project === undefined) return <ProjectDetailSkeleton />;
  if (project === null) return null;

  return (
    <>
      <div className="animate-fade-in-up">
        <ProjectHeaderPage
          title={project.title}
          description={project.description}
          demo={project.demo || ''}
          repository={project.repository || ''}
          icon={project.icon as string}
          body={project.body}
          locale={project.locale}
          technologies={project.technologies}
        />
      </div>

      <div className="animate-fade-in-up delay-150 mt-4">
        <ProjectVideo videoUrl={project.videoUrl} />
      </div>

      <div className="animate-fade-in-up delay-300 mt-10 mb-24">
        <article className="prose-reading max-w-none">
          <RichText data={project.body} />
        </article>
      </div>
    </>
  );
}
