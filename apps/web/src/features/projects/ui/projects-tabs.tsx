'use client';

import { FolderIcon } from '@/shared/components/icons';
import { ProjectCard } from '@/features/projects/ui/project-card';
import type { Project } from '@/shared/lib/content-types';
import { Empty } from '@/shared/components/ui/empty';
import { Tabs } from '@/shared/components/ui/tabs';
import { useQueryTab } from '@/shared/hooks/use-query-tab';
import { useTranslations } from 'next-intl';

export type CategoryProjects = {
  category: string;
  projects: Project[];
};

interface ProjectsTabsProps {
  data: CategoryProjects[];
}

export function ProjectsTabs({ data }: ProjectsTabsProps) {
  const t = useTranslations('sections.projects');
  const slugs = data.map(({ category }) => category.toLowerCase());
  const [activeTab, setActiveTab] = useQueryTab('projects', slugs, slugs[0] ?? '');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} variant="underline">
      <Tabs.List className="border-b border-rule p-0 mb-6 bg-transparent h-auto flex gap-6">
        {data.map(({ category }) => (
          <Tabs.Trigger
            key={category}
            value={category.toLowerCase()}
            className="type-label text-muted-foreground hover:text-foreground data-[state=active]:text-primary transition-colors bg-transparent border-0 cursor-pointer px-1 pb-3"
          >
            {category.toLowerCase()}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ category, projects }) => (
        <Tabs.Content key={category} value={category.toLowerCase()} className="mt-0">
          {projects.length === 0 ? (
            <Empty variant="outline">
              <Empty.Header>
                <Empty.Media variant="icon">
                  <FolderIcon strokeWidth={1.5} />
                </Empty.Media>
                <Empty.Title>{t('empty.title')}</Empty.Title>
                <Empty.Description>{t('empty.description')}</Empty.Description>
              </Empty.Header>
            </Empty>
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
