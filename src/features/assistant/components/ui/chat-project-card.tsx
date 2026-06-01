'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Link } from '@/i18n/navigation';
import type { Project, TechStack } from '@/payload-types';

import { useTranslations } from 'next-intl';
import { CodeIcon, LinkSquare02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function ChatProjectCard({ slug, title, demo, repository, technologies }: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <article className="group flex flex-col gap-3 p-5 rounded-2xl border border-border/40 bg-card/65 dark:bg-card/35 backdrop-blur-md hover:border-border/80 hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-all duration-300 relative overflow-hidden text-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-foreground tracking-tight group-hover:text-foreground transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('source')}
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-150"
            >
              <HugeiconsIcon icon={CodeIcon} className="size-4" />
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('preview')}
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-150"
            >
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
            </a>
          )}
          {slug && (
            <Link
              href={`/projects/${slug}`}
              aria-label={t('details')}
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-150"
            >
              <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
            </Link>
          )}
        </div>
      </div>
      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {techList.map((tech) => (
            <Badge
              key={tech.id}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-medium rounded-md"
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
