import type { CategoryProjects } from '@/features/projects/ui/projects-tabs';
import { Link } from '@/i18n/navigation';
import { Section } from '@/shared/components/ui/section';
import { ProjectIndex } from '../ui/project-index';
import { ProjectsSkeleton } from '../ui/projects-skeleton';

interface ProjectsWidgetProps {
  id: string;
  title?: string;
  viewAllLabel?: string;
  data?: CategoryProjects[] | null;
}

export function ProjectsWidget({ id, title = '', viewAllLabel, data }: ProjectsWidgetProps) {
  if (data === undefined) return <ProjectsSkeleton />;
  if (data === null || data.every((category) => category.projects.length === 0)) return null;

  return (
    <Section id={id} title={title}>
      <ProjectIndex data={data} />
      {viewAllLabel && (
        <Link
          href="/projects"
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium transition-colors hover:text-brand"
        >
          {viewAllLabel}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </Section>
  );
}
