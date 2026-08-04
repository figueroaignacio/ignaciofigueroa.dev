import type { Experience } from '@/payload-types';
import { formatDate } from '@/shared/lib/format-date';
import { getLocale, getTranslations } from 'next-intl/server';
import { getExperiences } from '../api/experience';
import type { TimelineItem } from '../ui/timeline';
import { TimelineWidget } from '../widgets/timeline-widget';

function toTimelineItems(experiences: Experience[], locale: string): TimelineItem[] {
  const presentLabel = locale === 'es' ? 'presente' : 'present';

  return experiences.map((experience) => ({
    key: String(experience.id),
    title: experience.title,
    subtitle: experience.company,
    subtitleHref: experience.link,
    connector: 'at',
    period: `${formatDate(experience.startDate, locale)} — ${
      experience.endDate ? formatDate(experience.endDate, locale) : presentLabel
    }`,
    current: !experience.endDate,
    bullets: experience.tasks.map((task) => task.item),
    chips:
      experience.technologies
        ?.map((tech) => tech.name)
        .filter((name): name is string => Boolean(name)) ?? [],
  }));
}

export async function ExperienceContainer() {
  const t = await getTranslations('sections.experience');
  const locale = await getLocale();
  const experiences = await getExperiences(locale);

  return (
    <TimelineWidget
      id="experience"
      title={t('title')}
      items={toTimelineItems(experiences, locale)}
    />
  );
}
