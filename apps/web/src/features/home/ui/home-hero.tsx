import { FileIcon } from '@/shared/components/icons';
import { Logo } from '@/shared/components/logo';
import { ScrambleText } from '@/shared/components/scramble-text';
import { LinkedInIcon } from '@/shared/components/tech-icons';
import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { getTranslations } from 'next-intl/server';
import { HeroAskButton } from './hero-ask-button';
import { HeroCredits } from './hero-credits';
import { HeroWorkingLink } from './hero-working-link';

const link =
  'group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium underline-offset-4 transition-colors hover:text-brand';

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
    <header className="hero-sheet frame-column">
      <Logo size={36} radius={10} className="hero-rise" />

      <div className="my-auto flex flex-col">
        <h1 className="type-hero hero-rise" style={{ '--d': '120ms' } as React.CSSProperties}>
          <ScrambleText text={firstName} />
          <br />
          <ScrambleText text={lastName} />
          <span aria-hidden="true" className="ml-[0.06em] inline-block size-[0.16em] bg-brand" />
        </h1>
        <p
          style={{ '--d': '220ms' } as React.CSSProperties}
          className="hero-rise mt-8 max-w-[34ch] text-lg leading-snug font-medium tracking-[-0.015em] text-pretty"
        >
          {t('lead')}
        </p>
        <div
          className="hero-rise mt-3 flex items-baseline gap-1.5 text-[15px]"
          style={{ '--d': '260ms' } as React.CSSProperties}
        >
          <span className="text-muted-foreground">{t('labels.now')}</span>
          <HeroWorkingLink
            href={t('status.workingUrl')}
            label={t('status.company')}
            note={t('status.madeThat')}
          />
        </div>

        <div
          style={{ '--d': '320ms' } as React.CSSProperties}
          className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          <HeroAskButton
            label={t('labels.askLong')}
            className="hero-ask inline-flex h-12 items-center gap-3 rounded-full bg-foreground ps-3 pe-5 text-[15px] font-medium text-background transition-[translate,background-color] hover:bg-brand hover:text-brand-foreground active:translate-y-px"
          />
          <nav aria-label={t('labels.links')} className="flex flex-wrap items-center gap-x-6">
            {links.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={link}>
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5"
                />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <HeroCredits />
    </header>
  );
}
