import { DocumentCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function CTACurriculum() {
  const t = useTranslations('components.ctaCv');

  return (
    <section className="p-5 rounded-2xl bg-secondary/15 border border-border/50 text-center space-y-3 hover:border-primary/20 transition-all duration-300">
      <h2 className="text-base font-semibold">{t('cta.title')}</h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">{t('cta.description')}</p>
      <a href={t('url')} target="_blank" className="btn btn-primary">
        <HugeiconsIcon icon={DocumentCodeIcon} className="h-4 w-4" />
        {t('cta.text')}
      </a>
    </section>
  );
}
