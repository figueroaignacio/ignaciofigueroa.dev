import type { Project, TechStack } from '@/payload-types';
import { BackLink } from '@/shared/components/back-link';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { buttonVariants } from '@/shared/components/ui/button-variants';
import { LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { getTranslations } from 'next-intl/server';
import { ProjectSummary } from './project-summary';

export async function ProjectHeaderPage({
  title,
  description,
  demo,
  repository,
  body,
  locale,
  technologies,
}: Partial<Project> & { locale?: string }) {
  const [t, tProjects] = await Promise.all([
    getTranslations('components.projectItem.actions'),
    getTranslations('sections.projects'),
  ]);

  const techList =
    technologies?.filter((tech): tech is TechStack => typeof tech === 'object') ?? [];

  return (
    <header className="mb-8 flex flex-col items-start pt-2 pb-6 border-b border-border/40 w-full">
      <div className="mb-6">
        <BackLink
          href="/projects"
          label={tProjects('viewAll')}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="type-page-title text-foreground lowercase">{title}</h1>
        </div>
        {description && (
          <p className="text-base text-muted-strong leading-relaxed max-w-2xl font-normal">
            {description}
          </p>
        )}
        {techList.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-muted-foreground">
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
      <div className="mt-6 flex flex-col gap-4 w-full">
        <div className="flex items-center gap-3 text-sm font-medium flex-wrap">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'default' })}
            >
              <span>{t('preview')}</span>
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
            </a>
          )}
          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline' })}
            >
              <GitHubIcon />
              <span>{t('source')}</span>
            </a>
          )}
        </div>
        {body && locale && <ProjectSummary body={body} locale={locale} />}
      </div>
    </header>
  );
}
