import { getTranslations } from 'next-intl/server';
import { HeroWorkingLink } from './hero-working-link';
import { LocalClock } from './local-clock';

export async function HeroStatus() {
  const t = await getTranslations('sections.home.status');

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
      />
      <HeroWorkingLink href={t('workingUrl')} label={t('working')} note={t('madeThat')} />
      <LocalClock
        label={t('localTime')}
        workingLabel={t('workingHours')}
        offLabel={t('offHours')}
      />
    </div>
  );
}
