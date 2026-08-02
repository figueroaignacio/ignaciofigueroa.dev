import type { Experience } from '@/payload-types';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getLocale, getTranslations } from 'next-intl/server';
import { getExperiences } from '../api/experience';

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
}

export async function ExperienceSection() {
  const t = await getTranslations('sections.experience');
  const locale = await getLocale();
  const experiences: Experience[] = await getExperiences(locale);

  if (!experiences || experiences.length === 0) return null;

  return (
    <Section id="experience" title={t('title')}>
      <ol className="relative ml-1 space-y-10 border-l border-border pl-6">
        {experiences.map((experience) => {
          const isCurrent = !experience.endDate;

          return (
            <li key={experience.id} className="relative">
              <span
                aria-hidden
                className={`absolute top-2 left-[-28.5px] size-2 rounded-full border ${
                  isCurrent ? 'border-foreground bg-foreground' : 'border-border bg-background'
                }`}
              />

              <span className="type-meta text-muted-foreground tracking-wider">
                {formatDate(experience.startDate, locale)} —{' '}
                {experience.endDate
                  ? formatDate(experience.endDate, locale)
                  : locale === 'es'
                    ? 'presente'
                    : 'present'}
              </span>

              <h3 className="type-item-title text-foreground mt-1">
                {experience.title}{' '}
                <span className="text-base font-normal text-muted-foreground">
                  at{' '}
                  {experience.link ? (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors underline decoration-border hover:decoration-primary"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    experience.company
                  )}
                </span>
              </h3>

              {experience.tasks && experience.tasks.length > 0 && (
                <ul className="mt-3 pl-4 space-y-1.5 list-disc text-sm leading-relaxed text-muted-foreground/90">
                  {experience.tasks.map((task) => (
                    <li key={task.id}>{task.item}</li>
                  ))}
                </ul>
              )}

              {experience.technologies && experience.technologies.length > 0 && (
                <TechChipGroup className="mt-3">
                  {experience.technologies.map((tech) => (
                    <TechChip key={tech.id}>{tech.name}</TechChip>
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
