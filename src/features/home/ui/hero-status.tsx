import { getTranslations } from 'next-intl/server';

export async function HeroStatus() {
  const t = await getTranslations('sections.home.status');

  return (
    <div className="group mt-6 flex items-start gap-2.5">
      <span
        aria-hidden="true"
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
      />
      <div className="w-fit">
        <a
          href={t('workingUrl')}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-mono text-xs leading-relaxed text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:text-brand group-hover:decoration-brand"
        >
          {t('working')}
        </a>

        <div aria-hidden="true" className="mt-2">
          <div className="hero-brace h-1.5 rounded-b-[5px] border-x border-b border-brand/50 transition-colors duration-300 group-hover:border-brand" />
          <div className="hero-brace-stem mx-auto h-1.5 w-px bg-brand/50 transition-colors duration-300 group-hover:bg-brand" />
        </div>

        <p className="hero-note mt-1 text-center font-serif text-[13px] leading-snug text-muted-strong italic">
          {t('madeThat')}
        </p>
      </div>
    </div>
  );
}
