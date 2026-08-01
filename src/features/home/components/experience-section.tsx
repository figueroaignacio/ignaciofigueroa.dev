import type { Experience } from '@/payload-types';
import { ItemCard } from '@/shared/components/ui/item-card';
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
      <ul className="space-y-4">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <ItemCard
              header={
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[19px] md:text-[20px] font-medium text-foreground">
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
                  <span className="shrink-0 text-[11px] font-mono tabular-nums text-muted tracking-wider">
                    {formatDate(experience.startDate, locale)} —{' '}
                    {experience.endDate
                      ? formatDate(experience.endDate, locale)
                      : locale === 'es'
                        ? 'presente'
                        : 'present'}
                  </span>
                </div>
              }
            >
              <article className="space-y-3">
                {experience.tasks && experience.tasks.length > 0 && (
                  <ul className="pl-4 space-y-1.5 list-disc text-[14px] leading-relaxed text-muted-foreground/90">
                    {experience.tasks.map((task) => (
                      <li key={task.id}>{task.item}</li>
                    ))}
                  </ul>
                )}

                {experience.technologies && experience.technologies.length > 0 && (
                  <TechChipGroup className="pt-1">
                    {experience.technologies.map((tech) => (
                      <TechChip key={tech.id}>{tech.name}</TechChip>
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
