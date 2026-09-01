import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
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
      <div className="flow-root w-full">
        <div
          className="float-right ml-6 mb-4 md:ml-8 md:mb-6 rounded-full overflow-hidden"
          style={{ shapeOutside: 'circle(50%)' }}
        >
          <Avatar size="lg" className="w-32 h-32 md:w-40 md:h-40 border border-border/40">
            <AvatarImage
              src="/images/profile-photo.webp"
              alt="Ignacio Figueroa — Fullstack Developer"
              width={160}
              height={160}
              fetchPriority="high"
              className="object-top"
            />
            <AvatarFallback className="text-xl">IF</AvatarFallback>
          </Avatar>
        </div>

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
