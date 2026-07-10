import type { Experience } from '@/payload-types';
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
    <section id="experience" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <ul className="divide-y divide-border">
        {experiences.map((experience) => (
          <li key={experience.id} className="py-6 first:pt-0 last:pb-0 group">
            <article className="space-y-3">
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

              {experience.tasks && experience.tasks.length > 0 && (
                <ul className="pl-4 space-y-1.5 list-disc text-[14px] leading-relaxed text-muted-foreground/90">
                  {experience.tasks.map((task) => (
                    <li key={task.id}>{task.item}</li>
                  ))}
                </ul>
              )}

              {experience.technologies && experience.technologies.length > 0 && (
                <div className="pt-1">
                  <p className="text-[11px] font-mono text-muted tracking-wide">
                    tech: {experience.technologies.map((tech) => tech.name).join(', ')}
                  </p>
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
