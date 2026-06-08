import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('sections.aboutMe.content');
  const tSection = useTranslations('sections.aboutMe');

  return (
    <section id="about" className="space-y-6 scroll-mt-20">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{tSection('title')}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {tSection('description')}
        </p>
      </div>

      <div className="flow-root w-full">
        <div
          className="float-right ml-6 mb-4 md:ml-8 md:mb-6 relative group rounded-full"
          style={{ shapeOutside: 'circle(50%)' }}
        >
          <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ">
            <img
              src="/images/profile-photo.png"
              alt="Ignacio Figueroa"
              className="w-full h-full object-cover transition-all duration-700"
            />
            <legend className="p-2 text-xs font-mono text-center">{t('photoLegend')}</legend>
          </div>
        </div>

        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p className="text-justify md:text-left">{t('bio')}</p>
          <p className="font-light italic text-muted-foreground text-justify md:text-left">
            {t('details')}
          </p>
        </div>

        <div className="clear-both flex flex-col space-y-2 pt-6 mt-6 border-t border-border">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Focus
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            React • Next.js • TypeScript • Node.js • AI Integration • Clean Architecture • Linux •
            Fedora
          </p>
        </div>
      </div>
    </section>
  );
}
