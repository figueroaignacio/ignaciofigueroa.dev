'use client';

import { ActivityIcon } from '@hugeicons/core-free-icons';
import { useTranslations } from 'next-intl';
import * as React from 'react';
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
  const [activeYear, setActiveYear] = React.useState<string>(initialYear);
  const currentYearData = years[Number(activeYear)] || { totalContributions: 0, contributions: [] };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{t('description')}</p>
        <GithubYearTabs
          activeYear={activeYear}
          availableYears={availableYears}
          onChange={setActiveYear}
        />
      </div>
      <div>
        <GithubStatsCard
          title={`${t('stats.contributions')} (${activeYear})`}
          value={currentYearData.totalContributions.toLocaleString()}
          icon={ActivityIcon}
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
