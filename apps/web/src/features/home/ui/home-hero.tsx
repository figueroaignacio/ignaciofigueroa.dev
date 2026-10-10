import { FileIcon } from '@/shared/components/icons';
import { ScrambleText } from '@/shared/components/scramble-text';
import { LinkedInIcon } from '@/shared/components/tech-icons';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { HeroAskButton } from './hero-ask-button';
import { HeroWorkingLink } from './hero-working-link';

const nameSize =
  'text-[clamp(2.5rem,min(11vw,6.5vh),3.5rem)] lg:text-[clamp(3.5rem,min(6.5vw,12vh),6rem)]';

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
      <div className="flex flex-1 flex-col justify-end gap-4 lg:gap-5">
        <p className="type-label lowercase text-muted-foreground">
          <span aria-hidden="true" className="text-muted-foreground/60">
            ./
          </span>
          {t('status.city')}
        </p>
        <h1 className="flex flex-col items-start gap-4 lg:gap-5">
          <span
            className={cn(
              nameSize,
              'block leading-[0.88] font-extrabold tracking-[-0.055em] uppercase',
            )}
          >
            <ScrambleText text={firstName} />
            <br />
            <ScrambleText text={lastName} />
            <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.16em] bg-brand" />
          </span>
          <span className="text-base font-semibold tracking-[-0.02em] text-muted-strong uppercase lg:text-lg">
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
