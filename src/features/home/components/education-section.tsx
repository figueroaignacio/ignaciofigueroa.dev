import { ItemCard } from '@/shared/components/ui/item-card';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getLocale, getTranslations } from 'next-intl/server';

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate: string | null;
}

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
}

export async function EducationSection() {
  const t = await getTranslations('sections.education');
  const locale = await getLocale();
  const items = t.raw('items') as EducationItem[];

  if (!items || items.length === 0) return null;

  return (
    <Section id="education" title={t('title')}>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.title}>
            <ItemCard
              header={
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="type-item-title text-foreground">
                    {item.title}{' '}
                    <span className="text-base font-normal text-muted-foreground">
                      {item.institution}
                    </span>
                  </h3>
                  <span className="shrink-0 type-meta text-muted-foreground tracking-wider">
                    {formatDate(item.startDate, locale)} —{' '}
                    {item.endDate ? formatDate(item.endDate, locale) : t('present')}
                  </span>
                </div>
              }
            >
              <article className="space-y-2">
                {item.description && (
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.skills.length > 0 && (
                  <TechChipGroup className="pt-1">
                    {item.skills.map((skill) => (
                      <TechChip key={skill}>{skill}</TechChip>
                    ))}
                  </TechChipGroup>
                )}
              </article>
            </ItemCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
