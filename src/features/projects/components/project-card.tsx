'use client';

import { Link } from '@/i18n/navigation';
import type { Project, TechStack } from '@/payload-types';
import { ItemCard } from '@/shared/components/ui/item-card';
import { useTranslations } from 'next-intl';

export function ProjectCard({
  slug,
  subtitle,
  title,
  demo,
  repository,
  technologies,
}: Partial<Project>) {
  const t = useTranslations('components.projectItem.actions');

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <ItemCard
      header={
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-[19px] md:text-[20px] font-medium text-foreground">
            <Link href={`/projects/${slug}`} className="hover:text-primary transition-colors">
              {title}
            </Link>
          </h3>

          <div className="flex items-center gap-4 text-xs font-mono">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('preview')}
              </a>
            )}
            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('source')}
              </a>
            )}
            <Link
              href={`/projects/${slug}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('details')}
            </Link>
          </div>
        </div>
      }
    >
      {subtitle && <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}

      {techList.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5 first:mt-0">
          {techList.map((tech) => {
            const techIcon = tech.icon && typeof tech.icon === 'object' ? tech.icon : null;
            return (
              <span
                key={tech.id}
                className="inline-flex items-center gap-1.5 bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground"
              >
                {techIcon?.svg && (
                  <span
                    aria-hidden="true"
                    className="size-3 flex items-center justify-center [&>svg]:size-full shrink-0"
                    dangerouslySetInnerHTML={{ __html: techIcon.svg }}
                  />
                )}
                {tech.name}
              </span>
            );
          })}
        </div>
      )}
    </ItemCard>
  );
}
