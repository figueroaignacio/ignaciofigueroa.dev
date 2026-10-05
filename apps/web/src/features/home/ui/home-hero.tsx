import { ScrambleText } from '@/shared/components/scramble-text';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { HeroAskButton } from './hero-ask-button';
import { HeroWorkingLink } from './hero-working-link';

const nameSize =
  'text-[clamp(2.75rem,min(13vw,7vh),4.25rem)] lg:text-[clamp(4rem,min(10vw,18vh),11rem)]';

const linkRow =
  'flex min-h-11 items-center justify-between transition-colors lg:min-h-0 lg:justify-start lg:gap-1.5 lg:hover:text-brand';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');
  const [firstName = '', ...rest] = t('name').split(' ');
  const lastName = rest.join(' ');

  const links = [
    { label: 'GitHub', href: 'https://github.com/figueroaignacio', icon: '↗' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/figueroa-ignacio', icon: '↗' },
    { label: t('labels.resume'), href: tCv('url'), icon: '↓' },
  ];

  return (
    <header className="flex min-h-0 min-w-0 flex-1 flex-col gap-8 lg:pb-4">
      <div className="flex flex-1 flex-col justify-end gap-4 lg:gap-5">
        <h1 className="flex flex-col items-start gap-4 leading-[0.8] font-black tracking-[-0.075em] uppercase lg:gap-6">
          <span className={cn('block', nameSize)}>
            <ScrambleText text={firstName} />
            <br />
            <ScrambleText text={lastName} />
          </span>
          <span className="bg-brand px-[0.14em] pt-[0.08em] text-[clamp(1.25rem,6vw,1.75rem)] leading-[0.88] tracking-[-0.06em] text-brand-foreground lg:text-[clamp(1.5rem,2.6vw,2.75rem)]">
            {t('title')}
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
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
              className={cn(linkRow, 'text-brand lg:hover:text-foreground')}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
