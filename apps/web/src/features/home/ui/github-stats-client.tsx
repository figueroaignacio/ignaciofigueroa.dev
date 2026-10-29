'use client';

import { useQueryTab } from '@/shared/hooks/use-query-tab';
import { useTranslations } from 'next-intl';
import { GithubContributionCalendar } from './github-contribution-calendar';
import { GithubStatsCard } from './github-stats-card';
import { GithubStatsClientProps } from './github-stats-types';
import { GithubYearTabs } from './github-year-tabs';

export function GithubStatsClient({
  initialYear,
  availableYears,
  topLanguages,
  years,
}: GithubStatsClientProps) {
  const t = useTranslations('sections.github');
  const [activeYear, setActiveYear] = useQueryTab('year', availableYears.map(String), initialYear);
  const currentYearData = years[Number(activeYear)] || { totalContributions: 0, contributions: [] };

  return (
    <div className="flex flex-col gap-8" data-reveal>
      <p className="max-w-[52ch] text-[15px] leading-relaxed">{t('description')}</p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <GithubStatsCard
          title={`${t('stats.contributions')} (${activeYear})`}
          value={currentYearData.totalContributions.toLocaleString()}
        />
        <GithubYearTabs
          activeYear={activeYear}
          availableYears={availableYears}
          onChange={setActiveYear}
        />
      </div>
      <div>
        <GithubContributionCalendar
          activeYear={activeYear}
          contributions={currentYearData.contributions}
          topLanguages={topLanguages}
          titleText={t('title')}
          topLanguagesLabel={t('stats.topLanguages')}
          lessLabel={t('grid.less')}
          moreLabel={t('grid.more')}
        />
      </div>
    </div>
  );
}
