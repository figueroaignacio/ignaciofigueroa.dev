import { Badge } from '@/shared/components/ui/badge';
import type { Experience } from '@/payload-types';

import { getLocale, getTranslations } from 'next-intl/server';
import { getExperiences } from '../api/experience';
import { AnimatedExperienceList } from './animated-experience-list';
import { AnimatedSectionHeader } from './animated-section-header';
import { Briefcase01Icon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
    <section className="space-y-6" aria-labelledby="experience-title">
      <AnimatedSectionHeader title={t('title')} description={t('description')} />

      <AnimatedExperienceList>
        {experiences.map((experience) => (
          <div key={experience.id}>
            <div
              className={`absolute left-0 top-1.5 size-[23px] rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-500 ${
                experience.isCurrent ? 'border-primary bg-primary' : 'border-border bg-card'
              }`}
            >
              <HugeiconsIcon
                icon={Briefcase01Icon}
                className={`size-3 ${experience.isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`}
              />
            </div>
            <article className="space-y-3 group">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground transition-colors duration-300">
                    {experience.title}
                  </h3>
                  {experience.isCurrent && (
                    <Badge
                      variant="default"
                      className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20 transition-colors"
                    >
                      {locale === 'es' ? 'Actual' : 'Current'}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {experience.link ? (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {experience.company}
                      <HugeiconsIcon icon={LinkSquare02Icon} className="size-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{experience.company}</span>
                  )}
                  {experience.location && (
                    <>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-muted-foreground">{experience.location}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground/70">
                  {formatDate(experience.startDate, locale)} —{' '}
                  {experience.endDate
                    ? formatDate(experience.endDate, locale)
                    : locale === 'es'
                      ? 'Presente'
                      : 'Present'}
                </p>
              </div>
              {experience.tasks && experience.tasks.length > 0 && (
                <ul className="space-y-1.5">
                  {experience.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                    >
                      <span className="text-primary/40 mt-0.5 shrink-0 transition-colors duration-300">
                        ▸
                      </span>
                      {task.item}
                    </li>
                  ))}
                </ul>
              )}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech.id}
                      variant="secondary"
                      className="text-[10px] bg-secondary/50 border-transparent transition-all"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          </div>
        ))}
      </AnimatedExperienceList>
    </section>
  );
}
