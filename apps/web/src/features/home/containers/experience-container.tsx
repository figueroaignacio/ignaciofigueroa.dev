import { Section } from '@/shared/components/ui/section';
import type { Experience } from '@/shared/lib/content-types';
import { formatDate } from '@/shared/lib/format-date';
import { getLocale, getTranslations } from 'next-intl/server';
import { getExperiences } from '../api/experience';
import { ExperienceList } from '../ui/experience-list';

function monthsBetween(start: string, end: string | null) {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  return (
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth()) + 1
  );
}

export async function ExperienceContainer() {
  const t = await getTranslations('sections.experience');
  const locale = await getLocale();
  const experiences: Experience[] = await getExperiences(locale);

  if (experiences.length === 0) return null;

  const items = experiences.map((experience) => {
    const months = monthsBetween(experience.startDate, experience.endDate);
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const duration = [
      years > 0 ? t('years', { count: years }) : '',
      rest > 0 ? t('months', { count: rest }) : '',
    ]
      .filter(Boolean)
      .join(' ');
    const end = experience.endDate ? formatDate(experience.endDate, locale) : t('present');
    const technologies = (experience.technologies ?? []).map((tech) => tech.trim()).filter(Boolean);

    return {
      key: String(experience.id),
      title: experience.title,
      company: experience.company,
      companyHref: experience.link,
      employmentType: experience.employmentType,
      period: `${formatDate(experience.startDate, locale)} – ${end} · ${duration}`,
      location: experience.location?.trim(),
      description: experience.description,
      tasks: experience.tasks ?? [],
      skills: technologies.slice(0, 3),
      moreSkills:
        technologies.length > 3 ? t('moreSkills', { count: technologies.length - 3 }) : undefined,
    };
  });

  return (
    <Section id="experience" title={t('title')}>
      <ExperienceList items={items} />
    </Section>
  );
}
