import { BackButton } from '@/shared/components/back-button';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import type { Project } from '@/payload-types';
import { LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { getTranslations } from 'next-intl/server';

export async function ProjectHeaderPage({
  title,
  description,
  demo,
  repository,
  icon,
}: Partial<Project>) {
  const t = await getTranslations('components.projectItem.actions');

  return (
    <header className="mb-12 flex flex-col items-start pt-4 pb-8 border-b border-border/40">
      <div className="mb-8">
        <BackButton className="text-muted-foreground hover:text-foreground transition-colors opacity-70 hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-4">
          {icon && (
            <div
              className="size-8 shrink-0 [&>svg]:size-full [&>svg]:text-foreground text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          )}
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-[90%] md:max-w-[80%] font-light">
            {description}
          </p>
        )}
      </div>
      {(demo || repository) && (
        <div className="mt-8 flex items-center gap-4 text-sm font-medium">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:bg-muted transition-colors text-foreground"
            >
              <GitHubIcon />
              <span>{t('source')}</span>
            </a>
          )}
        </div>
      )}
    </header>
  );
}
