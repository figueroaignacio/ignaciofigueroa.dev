'use client';

import { ProjectCard } from '@/features/projects/ui/project-card';
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
    <Tabs defaultValue={defaultValue} variant="underline">
      {/*
       * Deliberately NOT `bleed-x`: this list lives inside the centered
       * `.frame-column`, where a `--frame-bleed` offset would stop short of
       * the viewport instead of reaching it. It spans the column and the
       * section's own `rule-bleed` carries the full-width line.
       */}
      <Tabs.List className="border-b border-rule p-0 mb-6 bg-transparent h-auto flex gap-6">
        {data.map(({ category }) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className="type-label text-muted-foreground hover:text-foreground data-[state=active]:text-primary transition-colors bg-transparent border-0 cursor-pointer px-1 pb-3"
          >
            {category.toLowerCase()}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ category, projects }) => (
        <Tabs.Content key={category} value={category} className="mt-0">
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No projects yet.</p>
          ) : (
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
          )}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
