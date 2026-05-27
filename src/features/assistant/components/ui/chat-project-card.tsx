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
    <article className="flex flex-col gap-2 p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors text-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium text-foreground">{title}</h3>
        <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('source')}
              className="text-muted-foreground hover:text-foreground transition-colors"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
            </a>
          )}
          {slug && (
            <Link
              href={`/projects/${slug}`}
              aria-label={t('details')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
            </Link>
          )}
        </div>
      </div>
      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {techList.map((tech) => (
            <Badge
              key={tech.id}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal"
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
