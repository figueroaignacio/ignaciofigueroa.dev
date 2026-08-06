'use client';

import { Link } from '@/i18n/navigation';
import type { Project, TechStack } from '@/payload-types';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';

import { useTranslations } from 'next-intl';
import { CodeIcon, LinkSquare02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function ChatProjectCard({ slug, title, demo, repository, technologies }: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <article className="rounded-xl border border-border bg-card text-sm transition-colors hover:border-foreground/20">
      <div className="flex items-start justify-between gap-4 px-3.5 py-2.5">
        <h3 className="text-sm font-medium text-foreground tracking-tight">{title}</h3>
        <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('source')}
              className="text-muted-foreground hover:text-brand transition-colors duration-150"
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
              className="text-muted-foreground hover:text-brand transition-colors duration-150"
            >
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
            </a>
          )}
          {slug && (
            <Link
              href={`/projects/${slug}`}
              aria-label={t('details')}
              className="text-muted-foreground hover:text-brand transition-colors duration-150"
            >
              <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
            </Link>
          )}
        </div>
      </div>
      {techList.length > 0 && (
        <div className="mx-1.5 mb-1.5 rounded-lg border border-border bg-background p-3">
          <TechChipGroup className="gap-1.5">
            {techList.map((tech) => (
              <TechChip key={tech.id}>{tech.name}</TechChip>
            ))}
          </TechChipGroup>
        </div>
      )}
    </article>
  );
}
