import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const FOCUS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'AI Integration',
  'Clean Architecture',
  'Linux',
  'Fedora',
];

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');

  return (
    <Section id="about" title={tSection('title')}>
      <div className="flow-root w-full">
        <div
          className="float-right ml-6 mb-4 md:ml-8 md:mb-6 relative group rounded-full overflow-hidden"
          style={{ shapeOutside: 'circle(50%)' }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border/40">
            <Image
              src="/images/photo-profile.webp"
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

        <div className="clear-both space-y-2.5 pt-6 mt-6 border-t border-border">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">Focus</p>
          <TechChipGroup>
            {FOCUS.map((item) => (
              <TechChip key={item}>{item}</TechChip>
            ))}
          </TechChipGroup>
        </div>
      </div>
    </Section>
  );
}
