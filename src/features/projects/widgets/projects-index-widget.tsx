import type { Project } from '@/payload-types';
import { ProjectCard } from '../ui/project-card';
import { ProjectsIndexSkeleton } from '../ui/projects-index-skeleton';

interface ProjectsIndexWidgetProps {
  projects?: Project[] | null;
}

export function ProjectsIndexWidget({ projects }: ProjectsIndexWidgetProps) {
  if (projects === undefined) return <ProjectsIndexSkeleton />;
  if (projects === null || projects.length === 0) return null;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          slug={project.slug}
          title={project.title}
          subtitle={project.subtitle}
          technologies={project.technologies}
          repository={project.repository}
          demo={project.demo}
          icon={project.icon}
          labels={project.labels}
        />
      ))}
    </div>
  );
}
