import { getTranslations } from 'next-intl/server';
import { HeroStatus } from './hero-status';
import { ScrambleText } from './scramble-text';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <header className="flex min-w-0 flex-1 flex-col justify-center py-10 lg:py-0">
      <h1 className="type-display text-foreground lg:text-[2.5rem] xl:text-[3rem]">
        <ScrambleText text={t('name')} />
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-strong">{t('title')}</p>
      <div className="prose-reading mt-4 max-w-md">
        <p>{t('description')}</p>
      </div>
      <HeroStatus />
      <HeroActions cvLabel={tCv('cta.text')} cvUrl={tCv('url')} />
    </header>
  );
}
