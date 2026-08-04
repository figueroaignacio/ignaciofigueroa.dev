import { useTranslations } from 'next-intl';

export function CTACurriculum() {
  const t = useTranslations('components.ctaCv');

  return (
    <section id="cv" className="scroll-mt-12">
      <div className="rounded-xl border border-border bg-card text-center">
        <div className="mx-1.5 mt-1.5 rounded-lg border border-border bg-background px-6 py-8">
          <h2 className="type-label text-muted-foreground mb-3">{t('cta.title')}</h2>
          <p className="text-[17px] font-serif italic text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
        </div>
        <div className="px-4 py-3">
          <a
            href={t('url')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline decoration-border/60 hover:decoration-primary"
          >
            {t('cta.text').toLowerCase()} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
