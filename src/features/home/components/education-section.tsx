import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { Mortarboard02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
                className={`absolute top-0.5 left-[-34.5px] flex size-5 items-center justify-center rounded-full border bg-background ${
                  isCurrent
                    ? 'border-foreground text-foreground'
                    : 'border-border text-muted-foreground'
                }`}
              >
                <HugeiconsIcon icon={Mortarboard02Icon} className="size-3" />
              </span>

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
