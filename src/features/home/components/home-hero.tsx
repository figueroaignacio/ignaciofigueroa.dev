import { getTranslations } from 'next-intl/server';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <section className="space-y-4 mt-8">
      <p className="text-xs text-muted-foreground tracking-wide uppercase">{t('greeting')}</p>
      <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-balance leading-[1.1]">
        {t('name')}
      </h1>
      <p className="text-base text-muted-foreground leading-relaxed max-w-2xl text-balance">
        <span className="text-foreground font-medium">{t('title')}</span>
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl text-balance">
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
