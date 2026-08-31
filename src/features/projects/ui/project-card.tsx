'use client';

import { getLabelColor } from '@/features/projects/lib/get-label-color';
import { Link } from '@/i18n/navigation';
import type { Project, ProjectLabel, TechStack } from '@/payload-types';
import { ItemCard } from '@/shared/components/ui/item-card';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { useTranslations } from 'next-intl';

export function ProjectCard({
  slug,
  subtitle,
  title,
  demo,
  repository,
  technologies,
  labels,
}: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  const labelList =
    labels?.filter((label): label is ProjectLabel => typeof label === 'object') ?? [];

  return (
    <ItemCard
      header={
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
            <h3 className="type-item-title text-foreground">
              <Link href={`/projects/${slug}`} className="hover:text-brand transition-colors">
                {title}
              </Link>
            </h3>
            {labelList.length > 0 && (
              <span className="flex flex-wrap items-center gap-1.5">
                {labelList.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: getLabelColor(label.label) }}
                    />
                    {label.label}
                  </span>
                ))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand transition-colors"
              >
                {t('preview')}
              </a>
            )}
            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand transition-colors"
              >
                {t('source')}
              </a>
            )}
            <Link
              href={`/projects/${slug}`}
              className="text-muted-foreground hover:text-brand transition-colors"
            >
              {t('details')}
            </Link>
          </div>
        </div>
      }
    >
      {subtitle && <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}

      {techList.length > 0 && (
        <TechChipGroup className="mt-2.5 first:mt-0">
          {techList.map((tech) => {
            const techIcon = tech.icon && typeof tech.icon === 'object' ? tech.icon : null;
            return (
              <TechChip
                key={tech.id}
                icon={
                  techIcon?.svg ? (
                    <span
                      className="flex size-full items-center justify-center [&>svg]:size-full"
                      dangerouslySetInnerHTML={{ __html: techIcon.svg }}
                    />
                  ) : undefined
                }
              >
                {tech.name}
              </TechChip>
            );
          })}
        </TechChipGroup>
      )}
    </ItemCard>
  );
}
