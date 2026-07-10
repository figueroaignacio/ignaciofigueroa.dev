'use client';

import { Link } from '@/i18n/navigation';
import type { Project, TechStack } from '@/payload-types';
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
    <div className="py-5 first:pt-0 last:pb-0 group">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-[19px] md:text-[20px] font-medium text-foreground group-hover:text-primary transition-colors">
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

      {subtitle && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      )}

      {techList.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-muted">
          <span>tech:</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/80">
            {techList.map((tech) => {
              const techIcon = tech.icon && typeof tech.icon === 'object' ? tech.icon : null;
              return (
                <div key={tech.id} className="flex items-center gap-1">
                  {techIcon?.svg && (
                    <span
                      className="size-3.5 flex items-center justify-center [&>svg]:size-full shrink-0"
                      dangerouslySetInnerHTML={{ __html: techIcon.svg }}
                    />
                  )}
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
