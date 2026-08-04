import { ProjectsTabs, type CategoryProjects } from '@/features/projects/ui/projects-tabs';
import { Section } from '@/shared/components/ui/section';
import { ProjectsSkeleton } from '../ui/projects-skeleton';

interface ProjectsWidgetProps {
  id: string;
  title?: string;
  data?: CategoryProjects[] | null;
}

export function ProjectsWidget({ id, title = '', data }: ProjectsWidgetProps) {
  if (data === undefined) return <ProjectsSkeleton />;
  if (data === null || data.every((category) => category.projects.length === 0)) return null;

  return (
    <Section id={id} title={title}>
      <ProjectsTabs data={data} />
    </Section>
  );
}
