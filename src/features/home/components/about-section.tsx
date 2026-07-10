import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');

  return (
    <section id="about" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {tSection('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <div className="flow-root w-full">
        <div
          className="float-right ml-6 mb-4 md:ml-8 md:mb-6 relative group rounded-full overflow-hidden"
          style={{ shapeOutside: 'circle(50%)' }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border/40">
            <Image
              src="/images/profile-photo.webp"
              alt="Ignacio Figueroa — Fullstack Developer"
              width={160}
              height={160}
              priority
              className="w-full h-full object-cover object-top transition-all duration-700"
            />
          </div>
        </div>

        <div className="prose-reading">
          <p>{t('bio')}</p>
          <p className="font-light italic text-muted-foreground">{t('details')}</p>
        </div>

        <div className="clear-both flex flex-col space-y-2 pt-6 mt-6 border-t border-border">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">Focus</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            React • Next.js • TypeScript • Node.js • AI Integration • Clean Architecture • Linux •
            Fedora
          </p>
        </div>
      </div>
    </section>
  );
}
