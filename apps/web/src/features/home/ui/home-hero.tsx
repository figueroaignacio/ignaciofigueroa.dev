import { PanelShow } from '@/features/assistant/ui/panel-show';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { ScrambleText } from '@/shared/components/scramble-text';
import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { HeroAskButton } from './hero-ask-button';
import { HeroWorkingLink } from './hero-working-link';
import { LocalClock } from './local-clock';

const nameSize =
  'text-[clamp(3.25rem,min(15.5vw,8.5vh),5rem)] lg:text-[clamp(5rem,min(12.5vw,22vh),13.5rem)]';

const columnLabel =
  'hidden font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase lg:block';

const pill =
  'flex min-h-11 items-center justify-between rounded-full border-[1.5px] border-foreground px-3.5 text-[13px] font-extrabold uppercase transition-colors lg:min-h-0 lg:justify-start lg:gap-1.5 lg:rounded-none lg:border-0 lg:px-0 lg:text-[15px] lg:font-bold lg:normal-case lg:hover:text-brand';

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
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground lg:text-xs">
        <span className="hidden sm:inline">ignaciofigueroa.dev</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
          />
          <span>{t('status.city')}</span>
          <LocalClock
            label={t('status.localTime')}
            workingLabel={t('status.workingHours')}
            offLabel={t('status.offHours')}
          />
        </span>
      </div>

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

        <p className="text-[clamp(1rem,4.4vw,1.25rem)] leading-[1.1] font-black tracking-[-0.05em] uppercase lg:text-[clamp(1.25rem,1.8vw,1.625rem)] lg:leading-none">
          {t.rich('roleNote', {
            mark: (chunks) => (
              <mark className="box-decoration-clone bg-foreground px-[0.2em] pt-[0.08em] text-background">
                {chunks}
              </mark>
            ),
          })}
        </p>

        <div className="relative mt-5 grid gap-4 border-t-2 border-foreground pt-4 lg:mt-11 lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:pt-6">
          <div className="panel-stage">
            <PanelShow />
          </div>

          <p className="text-base leading-[1.2] font-bold tracking-[-0.03em] text-pretty lg:col-span-5 lg:text-[1.1875rem]">
            {t('description')}
          </p>

          <div className="flex flex-col gap-2.5 lg:col-span-2 lg:col-start-7">
            <span className={columnLabel}>{t('labels.now')}</span>
            <div className="flex items-center gap-2.5">
              <Avatar size="sm" className="shrink-0 border border-border/60">
                <AvatarImage
                  src="/images/profile-photo.webp"
                  alt="Ignacio Figueroa"
                  width={64}
                  height={64}
                  fetchPriority="high"
                  className="object-cover object-top"
                />
                <AvatarFallback className="font-mono text-[10px]">IF</AvatarFallback>
              </Avatar>
              <span className="font-mono text-[11px] whitespace-nowrap lg:font-sans lg:text-[15px] lg:font-bold">
                <HeroWorkingLink
                  href={t('status.workingUrl')}
                  label={t('status.company')}
                  note={t('status.madeThat')}
                />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:contents">
            <nav
              aria-label={t('labels.links')}
              className="contents lg:col-span-2 lg:col-start-9 lg:flex lg:flex-col lg:gap-2"
            >
              <span className={columnLabel}>{t('labels.links')}</span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill}
                >
                  {link.label}
                  <span aria-hidden="true">{link.icon}</span>
                </a>
              ))}
            </nav>

            <div className="contents lg:col-span-2 lg:col-start-11 lg:flex lg:flex-col lg:gap-2.5">
              <span className={columnLabel}>{t('labels.ask')}</span>
              <HeroAskButton
                label={t('labels.assistant')}
                className="flex min-h-11 items-center justify-between rounded-full bg-foreground px-3.5 text-[13px] font-extrabold text-background uppercase transition-colors whitespace-nowrap lg:justify-center lg:border-2 lg:border-foreground lg:bg-transparent lg:px-3 lg:text-[13px] xl:text-sm lg:tracking-[-0.02em] lg:text-foreground lg:hover:bg-foreground lg:hover:text-background"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
