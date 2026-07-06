'use client';

import { ProjectCard } from '@/features/projects/components/project-card';
import type { Project } from '@/payload-types';
import { Tabs } from '@/shared/components/ui/tabs';

export type CategoryProjects = {
  category: string;
  projects: Project[];
};

interface ProjectsTabsProps {
  data: CategoryProjects[];
}

export function ProjectsTabs({ data }: ProjectsTabsProps) {
  const defaultValue = data[0]?.category ?? '';

  return (
    <Tabs defaultValue={defaultValue}>
      <Tabs.List variant="outline" className="rounded-sm w-fit">
        {data.map(({ category }) => (
          <Tabs.Trigger key={category} value={category}>
            {category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ category, projects }) => (
        <Tabs.Content key={category} value={category}>
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No projects yet.</p>
          ) : (
            <div className="grid gap-4">
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
          )}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
