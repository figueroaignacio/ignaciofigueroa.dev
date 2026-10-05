import { ScrambleText } from '@/shared/components/scramble-text';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { HeroAskButton } from './hero-ask-button';
import { HeroWorkingLink } from './hero-working-link';

const nameSize =
  'text-[clamp(3.25rem,min(15.5vw,8.5vh),5rem)] lg:text-[clamp(5rem,min(12.5vw,22vh),13.5rem)]';

const linkRow =
  'flex min-h-12 items-center justify-between border-b border-border transition-colors lg:min-h-0 lg:justify-start lg:gap-1.5 lg:border-0 lg:hover:text-brand';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');
  const [firstName = '', ...rest] = t('name').split(' ');
  const lastName = rest.join(' ');
  const [role = '', ...roleRest] = t('title').split(' ');
  const roleTail = roleRest.join(' ');

  const links = [
    { label: 'GitHub', href: 'https://github.com/figueroaignacio', icon: '↗' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/figueroa-ignacio', icon: '↗' },
    { label: t('labels.resume'), href: tCv('url'), icon: '↓' },
  ];

  return (
    <header className="flex min-h-0 min-w-0 flex-1 flex-col gap-8 lg:pb-4">
      <div className="flex flex-1 flex-col justify-end gap-4 lg:gap-5">
        <h1 className="flex flex-col gap-3 leading-[0.8] font-black tracking-[-0.075em] uppercase lg:gap-0">
          <span className={cn('block', nameSize)}>
            <ScrambleText text={firstName} />
            <span className="lg:hidden">
              <br />
              <ScrambleText text={lastName} />
            </span>
          </span>
          <span className="flex lg:items-end lg:justify-between lg:gap-8">
            <span className={cn('hidden lg:block', nameSize)}>
              <ScrambleText text={lastName} />
            </span>
            <span className="flex gap-1.5 text-[clamp(1.5rem,7.7vw,2.25rem)] leading-[0.88] tracking-[-0.06em] lg:shrink-0 lg:flex-col lg:items-end lg:pb-[0.22em] lg:text-[clamp(2rem,3.6vw,4rem)]">
              <span className="bg-brand px-[0.14em] pt-[0.08em] text-brand-foreground">{role}</span>
              {roleTail ? (
                <span className="bg-brand px-[0.14em] pt-[0.08em] text-brand-foreground">
                  {roleTail}
                </span>
              ) : null}
            </span>
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-4 border-t border-foreground pt-4 lg:mt-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 lg:pt-5">
          <p className="text-base font-medium lg:text-[17px]">
            <span className="text-muted-foreground">{t('labels.now')} </span>
            <HeroWorkingLink
              href={t('status.workingUrl')}
              label={t('status.company')}
              note={t('status.madeThat')}
            />
          </p>

          <nav
            aria-label={t('labels.links')}
            className="flex flex-col text-base font-medium lg:flex-row lg:gap-8 lg:text-[17px]"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkRow}
              >
                {link.label}
                <span aria-hidden="true">{link.icon}</span>
              </a>
            ))}
            <HeroAskButton
              label={t('labels.ask')}
              className={cn(linkRow, 'border-b-0 text-brand lg:hover:text-foreground')}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
