'use client';

import { GitHubIcon } from '@/shared/components/tech-icons';
import { Badge } from '@/shared/components/ui/badge';
import type { Contribution, TechStack } from '@/payload-types';

import { GitBranchIcon, GitPullRequestIcon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
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
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col gap-5 border border-foreground/10 rounded-2xl p-6 bg-card backdrop-blur-sm"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-normal text-foreground text-xl tracking-tight transition-colors">
            {title}
          </h3>
          <div className="flex gap-2">
            <a
              href={repository}
              target="_blank"
              rel="noopener"
              className="p-1.5 hover:bg-foreground/5 rounded-md transition-colors"
              title={t('viewRepo')}
            >
              <GitHubIcon />
            </a>
            <a
              href={fork}
              target="_blank"
              rel="noopener"
              className="p-1.5 hover:bg-foreground/5 rounded-md transition-colors"
              title={t('viewFork')}
            >
              <HugeiconsIcon icon={GitBranchIcon} className="size-4" />
            </a>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[95%]">{description}</p>
      </div>
      {pullRequests && pullRequests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70">
            <HugeiconsIcon icon={GitPullRequestIcon} className="size-3" />
            <span>{t('pr')}s</span>
            <div className="h-px flex-1 bg-foreground/5" />
          </div>
          <div className="grid gap-2">
            {pullRequests.map((pr, index) => (
              <a
                key={index}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/pr flex items-center justify-between gap-3 p-2.5 rounded-lg border border-foreground/10 hover:bg-foreground/5 hover:border-foreground/10"
              >
                <span className="text-xs font-medium text-muted-foreground group-hover/pr:text-foreground truncate transition-colors">
                  {pr.label || `Pull Request #${index + 1}`}
                </span>
                <HugeiconsIcon
                  icon={LinkSquare02Icon}
                  className="size-3 text-muted-foreground/30 group-hover/pr:text-foreground transition-colors shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      )}
      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {techList.map((tech) => (
            <Badge
              key={tech.id}
              variant="outline"
              className="text-[10px] font-medium py-0 px-2 bg-foreground/2 border-foreground/10"
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      )}
    </motion.article>
  );
}
