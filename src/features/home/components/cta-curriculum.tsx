import { DocumentCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function CTACurriculum() {
  const t = useTranslations('components.ctaCv');

  return (
    <section id="cv" className="scroll-mt-12 text-center py-8 border-y border-border">
      <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted mb-2">
        {t('cta.title')}
      </h2>
      <p className="text-[17px] font-serif italic text-muted-foreground max-w-md mx-auto mb-4 leading-relaxed">
        {t('cta.description')}
      </p>
      <a
        href={t('url')}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono text-foreground hover:text-primary transition-colors underline decoration-border/60 hover:decoration-primary"
      >
        {t('cta.text').toLowerCase()}
      </a>
    </section>
  );
}
