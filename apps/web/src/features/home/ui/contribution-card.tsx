'use client';

import { ExternalLinkIcon, GitMergeIcon } from '@/shared/components/icons';
import type { Contribution } from '@/shared/lib/content-types';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
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

  const techList = technologies ?? [];

  return (
    <li className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em]">
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand"
          >
            {title}
          </a>
        </h3>
        <div className="flex items-center gap-5 text-[15px]">
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {t('viewRepo')} ↗
          </a>
          {fork && (
            <a
              href={fork}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {t('viewFork')} ↗
            </a>
          )}
        </div>
      </div>

      <p className="text-[15px] leading-relaxed">{description}</p>

      {pullRequests && pullRequests.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-xl bg-(--stage) p-2">
          {pullRequests.map((pr, index) => (
            <li key={index}>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/pr flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-[15px] transition-colors hover:bg-background"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <GitMergeIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{pr.label || `PR #${index + 1}`}</span>
                </span>
                <ExternalLinkIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/pr:translate-x-0.5 group-hover/pr:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {techList.length > 0 && (
        <TechChipGroup>
          {techList.map((tech) => (
            <TechChip key={tech.id}>{tech.name}</TechChip>
          ))}
        </TechChipGroup>
      )}
    </li>
  );
}
