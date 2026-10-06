import { FileIcon } from '@/shared/components/icons';
import { ScrambleText } from '@/shared/components/scramble-text';
import { LinkedInIcon } from '@/shared/components/tech-icons';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { FOCUS_LEAD } from './about-section';
import { DevBadge } from './dev-badge';
import { HeroAskButton } from './hero-ask-button';
import { HeroWorkingLink } from './hero-working-link';

const nameSize =
  'text-[clamp(2.75rem,min(13vw,7vh),4.25rem)] lg:text-[clamp(4rem,min(10vw,18vh),11rem)]';

const linkRow =
  'flex min-h-11 flex-row-reverse items-center justify-between border-t border-foreground/12 transition-colors lg:min-h-0 lg:flex-row lg:justify-start lg:gap-2 lg:border-0 lg:hover:text-brand';

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
    <header className="flex min-h-0 min-w-0 flex-1 flex-col gap-8 lg:pb-4">
      <DevBadge
        company={t('status.company')}
        city={t('status.city')}
        stack={FOCUS_LEAD}
        labels={{
          id: t('badge.id'),
          now: t('badge.now'),
          base: t('badge.base'),
          stack: t('badge.stack'),
          found: t('badge.found'),
          flip: t('badge.flip'),
        }}
        className="absolute -top-5 right-0 z-10 text-[clamp(5px,calc((100dvh-510px)/27.5),8px)] lg:top-[7.5em] lg:right-[10%] lg:text-[clamp(10px,calc((100dvh-280px)/36.5),16px)]"
      />
      <div className="flex flex-1 flex-col justify-end gap-4 lg:gap-5">
        <h1 className="flex flex-col items-start gap-4 leading-[0.8] font-black tracking-[-0.075em] uppercase lg:gap-6">
          <span className={cn('block', nameSize)}>
            <ScrambleText text={firstName} />
            <br />
            <ScrambleText text={lastName} />
          </span>
          <span className="bg-brand px-[0.14em] pt-[0.08em] text-[clamp(1.25rem,6vw,1.75rem)] leading-[0.88] tracking-[-0.06em] [word-spacing:0.18em] text-brand-foreground lg:text-[clamp(1.5rem,2.6vw,2.75rem)]">
            {t('title')}
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
          <p className="flex flex-wrap items-baseline gap-x-1.5 text-base font-medium lg:text-[17px]">
            <span className="text-muted-foreground">{t('labels.now')}</span>
            <HeroWorkingLink
              href={t('status.workingUrl')}
              label={t('status.company')}
              note={t('status.madeThat')}
            />
          </p>

          <nav
            aria-label={t('labels.links')}
            className="grid grid-cols-2 gap-x-6 text-base font-medium lg:flex lg:flex-row lg:gap-8 lg:text-[17px]"
          >
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkRow}
              >
                <Icon aria-hidden="true" className={linkIcon} />
                {label}
              </a>
            ))}
            <HeroAskButton
              label={t('labels.ask')}
              className={cn(
                linkRow,
                'text-[color-mix(in_oklch,var(--brand),black_28%)] dark:text-brand lg:hover:text-foreground',
              )}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
