'use client';

import type { CategoryProjects } from '@/features/projects/ui/projects-tabs';
import { Link } from '@/i18n/navigation';
import { Tabs } from '@/shared/components/ui/tabs';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { useQueryTab } from '@/shared/hooks/use-query-tab';
import type { Project } from '@/shared/lib/content-types';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const action =
  'inline-flex min-h-11 items-center text-[15px] font-medium underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand';

function videoPoster(url: string) {
  return url.replace('/upload/', '/upload/so_1,w_1200,f_jpg/').replace(/\.mp4$/, '.jpg');
}

function ProjectRow({
  project,
  active,
  onActivate,
}: {
  project: Project;
  active: boolean;
  onActivate: () => void;
}) {
  const t = useTranslations('components.projectItem.actions');
  const reduce = useReducedMotion();
  const labels = (project.labels ?? []).map((label) => label.label);

  return (
    <li
      data-active={active || undefined}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className="project-row group/row"
    >
      <div className="flex items-baseline justify-between gap-6 py-3.5">
        <h3 className="flex min-w-0 items-baseline gap-3 text-xl leading-tight font-semibold tracking-[-0.025em] text-muted-foreground transition-colors group-data-active/row:text-foreground">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 -translate-x-2 bg-brand opacity-0 transition-[opacity,translate] duration-300 group-data-active/row:translate-x-0 group-data-active/row:opacity-100"
          />
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {project.title}
          </Link>
        </h3>
        {labels.length > 0 && (
          <span className="hidden shrink-0 text-right text-[15px] text-muted-foreground sm:block">
            {labels.slice(0, 2).join(' · ')}
          </span>
        )}
      </div>

      <div className="project-row-body">
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 ps-[1.375rem] pb-6">
            {project.subtitle && <p className="max-w-[52ch] text-[15px]">{project.subtitle}</p>}
            {active && project.videoUrl && (
              <div className="overflow-hidden rounded-lg bg-(--stage)">
                <video
                  src={project.videoUrl}
                  poster={videoPoster(project.videoUrl)}
                  autoPlay={!reduce}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={project.title}
                  className="stage-drift aspect-video w-full object-cover"
                />
              </div>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <TechChipGroup>
                {project.technologies.slice(0, 6).map((tech, index) => (
                  <TechChip key={tech.id} tone={index < 3 ? 'lead' : 'muted'}>
                    {tech.name}
                  </TechChip>
                ))}
              </TechChipGroup>
            )}
            <div className="flex flex-wrap items-center gap-x-6">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={action}>
                  {t('preview')} ↗
                </a>
              )}
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={action}
                >
                  {t('source')} ↗
                </a>
              )}
              <Link href={`/projects/${project.slug}`} className={action}>
                {t('details')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function ProjectRows({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul data-reveal>
      {projects.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          active={index === active}
          onActivate={() => setActive(index)}
        />
      ))}
    </ul>
  );
}

export function ProjectIndex({ data }: { data: CategoryProjects[] }) {
  const t = useTranslations('sections.projects');
  const slugs = data.map(({ category }) => category.toLowerCase());
  const [activeTab, setActiveTab] = useQueryTab('projects', slugs, slugs[0] ?? '');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} variant="underline">
      <Tabs.List className="mb-6 flex h-auto gap-2 border-0 bg-transparent p-0">
        {data.map(({ category }) => (
          <Tabs.Trigger
            key={category}
            value={category.toLowerCase()}
            className="min-h-11 cursor-pointer rounded-full border-0 bg-transparent px-4 py-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-foreground [&>div]:hidden"
          >
            {category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ category, projects }) => (
        <Tabs.Content key={category} value={category.toLowerCase()} className="mt-0">
          {projects.length === 0 ? (
            <p className="py-6 text-[15px] text-muted-foreground">{t('empty.description')}</p>
          ) : (
            <ProjectRows projects={projects} />
          )}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
