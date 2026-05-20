'use client';

import { GitHubIcon } from '@/components/tech-icons';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import type { Project, ProjectLabel, TechStack } from '@/payload-types';
import { Globe02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function ProjectCard({
  slug,
  subtitle,
  title,
  demo,
  repository,
  technologies,
  icon,
  labels,
}: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  const labelsList =
    labels?.filter((label): label is ProjectLabel => typeof label === 'object') ?? [];

  const actions = [
    { label: t('source'), href: repository, icon: GitHubIcon, internal: false },
    { label: t('preview'), href: demo, icon: Globe02Icon, internal: false },
    { label: t('details'), href: `/projects/${slug}`, icon: InformationCircleIcon, internal: true },
  ];

  return (
    <article
      className="relative grid grid-cols-[1fr] gap-4 border-b border-border/50 py-6 last:border-b-0 sm:grid-cols-[auto_1fr]"
      aria-labelledby={`project-title-${title}`}
    >
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex flex-col items-baseline gap-2 flex-wrap">
            {labelsList.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {labelsList.map((label) => (
                  <span
                    key={label.id}
                    className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60"
                  >
                    {label.label}
                    <span className="mx-1">|</span>
                  </span>
                ))}
              </div>
            )}
            <h3
              id={`project-title-${title}`}
              className="font-heading text-[15px] font-bold text-foreground "
            >
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techList.map((tech) => (
              <Badge
                key={tech.id}
                variant="secondary"
                className="rounded-md px-2 py-0.5 text-[11px] font-normal"
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 ">
          {actions.map((action) => {
            const IconComp =
              typeof action.icon === 'function' ? (action.icon as React.ElementType) : null;

            const content = (
              <>
                {IconComp ? (
                  <IconComp className="size-3.5" />
                ) : (
                  <HugeiconsIcon icon={action.icon as IconSvgElement} className="size-3.5" />
                )}
                {action.label}
              </>
            );

            const cls = 'inline-flex items-center gap-1.5 text-xs text-muted-foreground';

            if (action.internal) {
              return (
                <Link
                  key={action.label}
                  href={action.href || '#'}
                  aria-label={action.label}
                  className={cls}
                >
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={action.label}
                href={action.href || ''}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.label}
                className={cls}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
