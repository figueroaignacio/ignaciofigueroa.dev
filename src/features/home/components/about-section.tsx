import { useTranslations } from 'next-intl';
import { AnimatedSectionHeader } from './animated-section-header';

export function AboutSection() {
  const t = useTranslations('sections.aboutMe.content');
  const tSection = useTranslations('sections.aboutMe');

  return (
    <section id="about" className="space-y-6 scroll-mt-20">
      <AnimatedSectionHeader title={tSection('title')} description={tSection('description')} />

      <div className="w-full">
        <div className="grid gap-8 md:gap-12 items-start w-full">
          <div className="space-y-8">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p className="">{t('bio')}</p>
              <p className="font-light italic text-muted-foreground">{t('details')}</p>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Focus
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                React • Next.js • TypeScript • Node.js • AI Integration • Clean Architecture • Linux
                • Fedora
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
