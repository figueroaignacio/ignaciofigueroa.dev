import { getTranslations } from 'next-intl/server';
import {
  getGithubStats,
  type GithubContributionDay,
  type YearContributionData,
} from '../api/github-stats';
import { GithubStatsClient } from './github-stats-client';

const getFallbackStats = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years: Record<number, YearContributionData> = {};

  for (let year = startYear; year <= currentYear; year++) {
    const contributions: GithubContributionDay[][] = [];
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    let current = new Date(start);
    current.setDate(current.getDate() - current.getDay());

    while (current <= end) {
      const week: GithubContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        week.push({
          color: '#ebedf0',
          contributionCount: 0,
          contributionLevel: 'NONE',
          date: current.toISOString().split('T')[0],
        });
        current.setDate(current.getDate() + 1);
      }
      contributions.push(week);
    }

    let total = 0;
    if (year === 2024) total = 1732;
    else if (year === 2025) total = 2490;
    else total = 250;

    years[year] = {
      totalContributions: total,
      contributions,
    };
  }

  return {
    publicRepos: 28,
    followers: 17,
    following: 32,
    totalStars: 17,
    topLanguages: [
      { language: 'TypeScript', count: 8 },
      { language: 'Python', count: 3 },
      { language: 'CSS', count: 2 },
      { language: 'Java', count: 2 },
      { language: 'Astro', count: 1 },
    ],
    years,
  };
};

export async function GithubStatsSection() {
  const t = await getTranslations('sections.github');
  let stats = await getGithubStats();

  if (!stats) {
    stats = getFallbackStats();
  }

  const availableYears = Object.keys(stats.years)
    .map(Number)
    .sort((a, b) => b - a);

  const currentYear = new Date().getFullYear().toString();
  const initialYear = availableYears.includes(Number(currentYear))
    ? currentYear
    : availableYears[0]?.toString() || '2026';

  return (
    <section aria-labelledby="github-stats-title">
      <div>
        <h2 id="github-stats-title" className="text-xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h2>
      </div>
      <GithubStatsClient
        initialYear={initialYear}
        availableYears={availableYears}
        publicRepos={stats.publicRepos}
        followers={stats.followers}
        following={stats.following}
        totalStars={stats.totalStars}
        topLanguages={stats.topLanguages}
        years={stats.years}
      />
    </section>
  );
}
