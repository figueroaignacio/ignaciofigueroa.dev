import { ProjectsTabs, type CategoryProjects } from '@/features/projects/ui/projects-tabs';
import { Link } from '@/i18n/navigation';
import { Section } from '@/shared/components/ui/section';
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
      <ProjectsTabs data={data} />
      {viewAllLabel && (
        <div className="mt-8 flex justify-end border-t border-border pt-4">
          <Link
            href="/projects"
            className="rounded-sm font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {viewAllLabel} →
          </Link>
        </div>
      )}
    </Section>
  );
}
