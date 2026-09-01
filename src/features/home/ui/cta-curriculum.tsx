import { Frame } from '@/shared/components/ui/frame';
import { useTranslations } from 'next-intl';

export function CTACurriculum() {
  const t = useTranslations('components.ctaCv');

  return (
    <section id="cv" className="scroll-mt-12">
      <div className="rule-bleed" aria-hidden="true" />
      <Frame className="frame-column mt-10 text-center md:mt-12">
        <Frame.Panel className="bg-background px-6 py-8">
          <h2 className="type-label text-muted-foreground mb-3">{t('cta.title')}</h2>
          <p className="text-[15px] font-serif italic text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
        </Frame.Panel>
        <Frame.Footer className="justify-center">
          <a
            href={t('url')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-brand transition-colors underline decoration-border/60 hover:decoration-brand"
          >
            {t('cta.text').toLowerCase()} ↗
          </a>
        </Frame.Footer>
      </Frame>
      <div className="pb-10" />
    </section>
  );
}
