import { FileIcon } from '@/shared/components/icons';
import { ScrambleText } from '@/shared/components/scramble-text';
import { LinkedInIcon } from '@/shared/components/tech-icons';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { HeroAskButton } from './hero-ask-button';
import { HeroCommits } from './hero-commits';
import { HeroWorkingLink } from './hero-working-link';

const nameSize =
  'text-[clamp(2.25rem,min(11vw,6vh),2.75rem)] lg:text-[clamp(2.75rem,min(4.5vw,8vh),3.25rem)]';

const linkRow =
  'flex min-h-11 flex-row-reverse items-center justify-between border-t border-foreground/12 transition-colors hover:text-brand';

const linkIcon = 'size-4 shrink-0';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');
  const [firstName = '', ...rest] = t('name').split(' ');
  const lastName = rest.join(' ');

  const links = [
    { label: 'GitHub', href: 'https://github.com/figueroaignacio', Icon: GitHubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/figueroa-ignacio', Icon: LinkedInIcon },
    { label: t('labels.resume'), href: tCv('url'), Icon: FileIcon },
  ];

  return (
    <header className="mx-auto flex min-h-0 w-full max-w-(--frame-measure) min-w-0 flex-1 flex-col justify-end gap-7">
      <Suspense fallback={null}>
        <HeroCommits />
      </Suspense>

      <div className="flex flex-col gap-4">
        <p className="type-label lowercase text-muted-foreground">
          <span aria-hidden="true" className="text-muted-foreground/60">
            ./
          </span>
          {t('status.city')}
        </p>
        <h1 className="flex flex-col items-start gap-3.5">
          <span
            className={cn(nameSize, 'block leading-[0.95] font-bold tracking-[-0.04em] uppercase')}
          >
            <ScrambleText text={firstName} />
            <br />
            <ScrambleText text={lastName} />
            <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.16em] bg-brand" />
          </span>
          <span className="text-[13px] font-semibold tracking-[0.04em] text-muted-strong uppercase">
            {t('title')}
          </span>
        </h1>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-1.5 text-[15px] font-medium">
        <span className="text-muted-foreground">{t('labels.now')}</span>
        <HeroWorkingLink
          href={t('status.workingUrl')}
          label={t('status.company')}
          note={t('status.madeThat')}
        />
      </div>

      <nav
        aria-label={t('labels.links')}
        className="grid grid-cols-2 gap-x-6 text-[15px] font-medium"
      >
        {links.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkRow}>
            <Icon aria-hidden="true" className={linkIcon} />
            {label}
          </a>
        ))}
        <HeroAskButton
          label={t('labels.ask')}
          className={cn(
            linkRow,
            'text-[color-mix(in_oklch,var(--brand),black_28%)] hover:text-foreground dark:text-brand',
          )}
        />
      </nav>
    </header>
  );
}
