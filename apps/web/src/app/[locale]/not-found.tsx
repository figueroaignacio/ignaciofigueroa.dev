'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Dock } from '@/shared/components/dock';
import { HigoSplit } from '@/shared/components/higo-split';
import { ChevronLeftIcon, FolderIcon, HigoIcon } from '@/shared/components/icons';
import { useTranslations } from 'next-intl';

const EMAIL = 'contact@ignaciofigueroa.dev';

const link =
  'group inline-flex min-h-11 cursor-pointer items-center gap-2 text-[15px] font-medium underline-offset-4 transition-colors hover:text-brand-text';

export default function NotFound() {
  const t = useTranslations('pages.notFound');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <main id="main-content" className="page-frame flex flex-1 flex-col" tabIndex={-1}>
        <div className="hero-island flex flex-1 flex-col">
          <div className="hero-sheet frame-column flex-1 pb-(--dock-space)">
            <div className="my-auto flex flex-col">
              <HigoSplit
                className="hero-rise mb-7 h-9 w-auto self-start"
                style={{ '--d': '60ms' } as React.CSSProperties}
              />
              <p
                className="hero-rise type-label mb-4 break-all text-muted-foreground"
                style={{ '--d': '100ms' } as React.CSSProperties}
              >
                error 404 · {pathname}
              </p>
              <h1 className="type-hero hero-rise" style={{ '--d': '120ms' } as React.CSSProperties}>
                {t('titleLead')}
                <br />
                {t('titleRest')}
                <span
                  aria-hidden="true"
                  className="ml-[0.06em] inline-block size-[0.16em] bg-brand"
                />
              </h1>
              <p
                className="hero-rise mt-8 max-w-[34ch] text-lg leading-snug font-medium tracking-[-0.015em] text-pretty"
                style={{ '--d': '220ms' } as React.CSSProperties}
              >
                {t('description')}
              </p>

              <nav
                aria-label={t('actionsLabel')}
                className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
                style={{ '--d': '320ms' } as React.CSSProperties}
              >
                <Link
                  href="/"
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-foreground ps-4 pe-5 text-[15px] font-medium text-background transition-[translate,background-color] hover:bg-brand hover:text-brand-foreground active:translate-y-px"
                >
                  <HigoIcon className="size-[18px]" />
                  {t('actionHome')}
                </Link>
                <button type="button" className={link} onClick={() => router.back()}>
                  <ChevronLeftIcon className="size-4 shrink-0" />
                  {t('actionBack')}
                </button>
                <Link href="/projects" className={link}>
                  <FolderIcon className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                  {t('actionProjects')}
                </Link>
              </nav>
            </div>

            <p className="text-[13px] text-muted-foreground">
              {t('reportLead')}{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand-text hover:decoration-brand"
              >
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </main>

      <Dock />
    </div>
  );
}
