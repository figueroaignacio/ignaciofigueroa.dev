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
      <ol className="relative ml-1 space-y-10 border-l border-border pl-6">
        {items.map((item) => {
          const isCurrent = !item.endDate;

          return (
            <li key={item.title} className="relative">
              <span
                aria-hidden
                className={`absolute top-2 left-[-28.5px] size-2 rounded-full border ${
                  isCurrent ? 'border-foreground bg-foreground' : 'border-border bg-background'
                }`}
              />

              <span className="type-meta text-muted-foreground tracking-wider">
                {formatDate(item.startDate, locale)} —{' '}
                {item.endDate ? formatDate(item.endDate, locale) : t('present')}
              </span>

              <h3 className="type-item-title text-foreground mt-1">
                {item.title}{' '}
                <span className="text-base font-normal text-muted-foreground">
                  {item.institution}
                </span>
              </h3>

              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                  {item.description}
                </p>
              )}

              {item.skills.length > 0 && (
                <TechChipGroup className="mt-3">
                  {item.skills.map((skill) => (
                    <TechChip key={skill}>{skill}</TechChip>
                  ))}
                </TechChipGroup>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
