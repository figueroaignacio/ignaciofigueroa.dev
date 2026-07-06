'use client';

import { Link } from '@/i18n/navigation';
import type { Project, ProjectLabel, TechStack } from '@/payload-types';
import { GitHubIcon } from '@/shared/components/tech-icons';
import { Badge } from '@/shared/components/ui/badge';
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
      className={`relative bg-card p-6 rounded-2xl border border-foreground/10 ${
        icon ? 'grid grid-cols-[1fr] gap-4 sm:grid-cols-[auto_1fr]' : 'flex flex-col'
      }`}
      aria-labelledby={`project-title-${title}`}
    >
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex flex-col items-baseline gap-2 flex-wrap">
            {/* {labelsList.length > 0 && (
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
            )} i'll see what i'll do with this shit later */}
            <h3
              id={`project-title-${title}`}
              className="font-heading text-lg font-normal text-foreground"
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
            {techList.map((tech) => {
              const techIcon = tech.icon && typeof tech.icon === 'object' ? tech.icon : null;
              return (
                <Badge
                  key={tech.id}
                  variant="outline"
                  className="rounded-md px-2 py-1 font-normal flex items-center gap-1.5"
                >
                  {techIcon?.svg && (
                    <span
                      className="size-3.5 flex items-center justify-center [&>svg]:size-full [&>svg]:fill-current text-foreground shrink-0"
                      dangerouslySetInnerHTML={{ __html: techIcon.svg }}
                    />
                  )}
                  <span>{tech.name}</span>
                </Badge>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-end gap-4">
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

            const cls =
              'inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:underline hover:text-foreground transition-colors';

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
