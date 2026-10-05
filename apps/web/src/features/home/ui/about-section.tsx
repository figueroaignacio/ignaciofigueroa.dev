import { Section } from '@/shared/components/ui/section';
import { Separator } from '@/shared/components/ui/separator';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';
import { DevBadge } from './dev-badge';

const FOCUS_LEAD = ['React', 'Next.js', 'TypeScript', 'Node.js'];
const FOCUS_SUPPORT = ['AI Integration', 'Clean Architecture', 'Linux', 'Fedora'];

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');
  const tHome = await getTranslations('sections.home');

  return (
    <Section
      id="about"
      title={tSection('title')}
      className="relative"
      accessory={
        <DevBadge
          name={tHome('name')}
          role={tHome('title')}
          company={tHome('status.company')}
          city={tHome('status.city')}
          stack={FOCUS_LEAD}
          labels={{
            id: tSection('badge.id'),
            now: tSection('badge.now'),
            base: tSection('badge.base'),
            stack: tSection('badge.stack'),
            found: tSection('badge.found'),
            flip: tSection('badge.flip'),
          }}
          className="mx-auto mb-10 sm:absolute sm:top-0 sm:right-[calc((100%-min(100%,var(--frame-measure)))/2)] sm:mb-0"
        />
      }
    >
      <div className="w-full">
        <div aria-hidden="true" className="float-right ml-10 hidden h-[25rem] w-60 sm:block" />
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
