import { useTranslations } from 'next-intl';

export function CTACurriculum() {
  const t = useTranslations('components.ctaCv');

  return (
    <section id="cv" className="scroll-mt-20 py-14 lg:py-16">
      <div
        className="frame-column flex flex-col gap-6 rounded-2xl bg-inverse p-8 text-inverse-foreground sm:flex-row sm:items-end sm:justify-between sm:p-10"
        data-reveal
      >
        <div className="flex max-w-[30ch] flex-col gap-3">
          <h2 className="type-section">{t('cta.title')}</h2>
          <p className="text-[15px] leading-relaxed">{t('cta.description')}</p>
        </div>
        <a
          href={t('url')}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-inverse-foreground px-6 text-[15px] font-medium text-inverse transition-colors hover:bg-brand hover:text-brand-foreground"
        >
          {t('cta.text')}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
