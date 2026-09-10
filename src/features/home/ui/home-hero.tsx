import { getTranslations } from 'next-intl/server';
import { HeroStatus } from './hero-status';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <header className="scroll-blur-out frame-column pt-12 pb-8 md:pt-16 md:pb-10">
      <div className="flex min-w-0 flex-col">
        <h1 className="type-display text-foreground">{t('name')}</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-strong">{t('title')}</p>
        <div className="prose-reading mt-3">
          <p>{t('description')}</p>
        </div>
        <HeroStatus />
        <HeroActions cvLabel={tCv('cta.text')} cvUrl={tCv('url')} />
      </div>
    </header>
  );
}
