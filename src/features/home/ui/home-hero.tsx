import { getTranslations } from 'next-intl/server';
import { HeroStatus } from './hero-status';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <header className="mb-14 md:mb-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="type-display text-foreground">{t('name')}</h1>
          <p className="mt-4 text-[19px] leading-relaxed text-muted-strong md:text-[21px]">
            {t('title')}
          </p>
          <div className="prose-reading mt-5">
            <p>{t('description')}</p>
          </div>
          <HeroActions cvLabel={tCv('cta.text')} cvUrl={tCv('url')} />
        </div>

        <HeroStatus />
      </div>
    </header>
  );
}
