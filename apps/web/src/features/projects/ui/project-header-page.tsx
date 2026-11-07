import { BackButton } from '@/shared/components/back-button';
import type { Project } from '@/shared/lib/content-types';
import { getTranslations } from 'next-intl/server';
import { ProjectSummary } from './project-summary';

const action =
  'inline-flex min-h-11 items-center text-[15px] font-medium underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand';

export async function ProjectHeaderPage({
  slug,
  title,
  subtitle,
  description,
  demo,
  repository,
  body,
  locale,
  technologies,
  labels,
}: Partial<Project> & { locale?: string }) {
  const t = await getTranslations('components.projectItem');

  const meta = [
    { key: t('areas'), value: (labels ?? []).map((item) => item.label).join(' · ') },
    { key: t('stack'), value: (technologies ?? []).map((tech) => tech.name.trim()).join(' · ') },
  ].filter((item) => item.value);

  return (
    <header className="flex w-full flex-col items-start">
      <BackButton
        label={`./${t('projects')}`}
        fallbackHref="/projects"
        className="-ms-1 min-h-11 font-mono text-[13px] text-muted-foreground hover:text-foreground"
      />

      <p className="mt-10 font-mono text-[13px] text-muted-foreground">
        ./{t('projects')}/{slug?.replace(/-(es|en)$/, '')}
      </p>
      <h1 className="mt-5 text-[clamp(2.75rem,7vw,4rem)] leading-[0.95] font-bold tracking-[-0.045em] text-balance uppercase">
        {title}
        <span aria-hidden="true" className="ml-[0.08em] inline-block size-[0.16em] bg-brand" />
      </h1>
      {subtitle && (
        <p className="mt-6 max-w-[34ch] text-lg leading-snug font-medium tracking-[-0.015em] text-pretty md:text-[22px]">
          {subtitle.trim()}
        </p>
      )}
      {description && (
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted-strong md:text-base">
          {description}
        </p>
      )}

      {meta.length > 0 && (
        <dl className="mt-8 grid w-full gap-x-6 border-t border-border sm:grid-cols-2">
          {meta.map((item) => (
            <div key={item.key} className="flex flex-col gap-1.5 border-b border-border py-4">
              <dt className="font-mono text-xs text-muted-foreground">./{item.key}</dt>
              <dd className="text-sm leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className={action}>
            {t('actions.preview')} ↗
          </a>
        )}
        {repository && (
          <a href={repository} target="_blank" rel="noopener noreferrer" className={action}>
            {t('actions.source')} ↗
          </a>
        )}
        {body && locale && <ProjectSummary body={body} locale={locale} />}
      </div>
    </header>
  );
}
