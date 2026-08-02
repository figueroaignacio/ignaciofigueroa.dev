import { getTranslations } from 'next-intl/server';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <header className="mb-14 md:mb-16">
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <h1 className="type-display text-foreground">{t('name')}</h1>
      </div>
      <p className="mt-5 text-[18px] md:text-[19px] leading-relaxed text-muted-strong font-normal">
        {t('title')}
      </p>
      <div className="prose-reading mt-5">
        <p>{t('description')}</p>
      </div>
      <HeroActions cvLabel={tCv('cta.text')} cvUrl={tCv('url')} />
    </header>
  );
}
