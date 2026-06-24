import { getTranslations } from 'next-intl/server';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <section className="space-y-6 mt-10">
      <p className="text-sm text-muted-foreground">{t('greeting')}</p>
      <h1 className="text-5xl sm:text-6xl font-normal tracking-tight text-balance leading-[1.05]">
        {t('name')}
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
        <span className="text-foreground font-medium">{t('title')}</span>
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-2xl text-balance">
        {t('description')}
      </p>
      <HeroActions
        chatLabel={t('actions.chatAssistant')}
        cvLabel={t('actions.viewCv')}
        cvUrl={tCv('url')}
      />
    </section>
  );
}
