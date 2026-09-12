import { formatDate } from '@/shared/lib/format-date';
import { getLocale, getTranslations } from 'next-intl/server';
import type { TimelineItem } from '../ui/timeline';
import { TimelineWidget } from '../widgets/timeline-widget';

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate: string | null;
}

export async function EducationContainer() {
  const t = await getTranslations('sections.education');
  const locale = await getLocale();
  const education = t.raw('items') as EducationItem[];

  const items: TimelineItem[] = education.map((item) => ({
    key: item.title,
    title: item.title,
    subtitle: item.institution,
    period: `${formatDate(item.startDate, locale)} — ${
      item.endDate ? formatDate(item.endDate, locale) : t('present')
    }`,
    current: !item.endDate,
    description: item.description,
    chips: item.skills,
  }));

  return <TimelineWidget id="education" title={t('title')} items={items} />;
}
