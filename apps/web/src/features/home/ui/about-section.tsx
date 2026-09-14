import { Section } from '@/shared/components/ui/section';
import { Separator } from '@/shared/components/ui/separator';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';

const FOCUS_LEAD = ['React', 'Next.js', 'TypeScript', 'Node.js'];
const FOCUS_SUPPORT = ['AI Integration', 'Clean Architecture', 'Linux', 'Fedora'];

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');

  return (
    <Section id="about" title={tSection('title')}>
      <div className="w-full">
        <div className="prose-reading">
          <p>{t('bio')}</p>
          <p className="font-light italic text-muted-foreground">{t('details')}</p>
        </div>

        <div className="clear-both pt-6 mt-6">
          <Separator className="mb-6" />
          <div className="space-y-2.5">
            <p className="type-label text-muted-foreground">Focus</p>
            <TechChipGroup>
              {FOCUS_LEAD.map((item) => (
                <TechChip key={item} tone="lead">
                  {item}
                </TechChip>
              ))}
              {FOCUS_SUPPORT.map((item) => (
                <TechChip key={item}>{item}</TechChip>
              ))}
            </TechChipGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
