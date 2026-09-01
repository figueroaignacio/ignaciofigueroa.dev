'use client';

import { Link } from '@/i18n/navigation';
import type { Project, TechStack } from '@/payload-types';
import { Frame } from '@/shared/components/ui/frame';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { CodeIcon, InformationCircleIcon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function ChatProjectCard({ slug, title, demo, repository, technologies }: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <Frame className="text-sm transition-colors hover:border-foreground/20">
      <Frame.Header className="flex-row items-start justify-between gap-4 py-2">
        <Frame.Title className="leading-snug">{title}</Frame.Title>
        <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('source')}
              className="text-muted-foreground transition-colors duration-150 hover:text-brand"
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
              className="text-muted-foreground transition-colors duration-150 hover:text-brand"
            >
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
            </a>
          )}
          {slug && (
            <Link
              href={`/projects/${slug}`}
              aria-label={t('details')}
              className="text-muted-foreground transition-colors duration-150 hover:text-brand"
            >
              <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />
            </Link>
          )}
        </div>
      </Frame.Header>
      {techList.length > 0 && (
        <Frame.Panel className="p-3">
          <TechChipGroup className="gap-1.5">
            {techList.map((tech) => (
              <TechChip key={tech.id}>{tech.name}</TechChip>
            ))}
          </TechChipGroup>
        </Frame.Panel>
      )}
    </Frame>
  );
}
