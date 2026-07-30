'use client';

import type { Contribution, TechStack } from '@/payload-types';
import { ItemCard } from '@/shared/components/ui/item-card';
import { LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

type ContributionCardProps = Pick<
  Contribution,
  'title' | 'description' | 'technologies' | 'repository' | 'fork' | 'pullRequests'
>;

export function ContributionCard({
  title,
  description,
  technologies,
  repository,
  fork,
  pullRequests,
}: ContributionCardProps) {
  const t = useTranslations('sections.contributions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <li>
      <ItemCard
        header={
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-[19px] md:text-[20px] font-medium text-foreground">
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {title}
              </a>
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('viewRepo').toLowerCase()}
              </a>
              {fork && (
                <a
                  href={fork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('viewFork').toLowerCase()}
                </a>
              )}
            </div>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

        {pullRequests && pullRequests.length > 0 && (
          <div className="mt-3 pl-4 space-y-1">
            {pullRequests.map((pr, index) => (
              <a
                key={index}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/pr flex items-center justify-between gap-3 text-xs font-mono text-muted-foreground hover:text-primary transition-colors py-1 max-w-md border-b border-border/30 last:border-b-0"
              >
                <span className="truncate">{pr.label || `pr #${index + 1}`}</span>
                <HugeiconsIcon icon={LinkSquare02Icon} className="size-3 opacity-60 shrink-0" />
              </a>
            ))}
          </div>
        )}

        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techList.map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </ItemCard>
    </li>
  );
}
