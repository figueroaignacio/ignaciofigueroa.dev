import { getTranslations } from 'next-intl/server';
import { getGithubStats } from '../api/github-stats';
import { GithubStatsWidget, type GithubStatsWidgetData } from '../widgets/github-stats-widget';

export async function GithubStatsContainer() {
  const t = await getTranslations('sections.github');
  const stats = await getGithubStats();

  if (!stats) return null;

  const availableYears = Object.keys(stats.years)
    .map(Number)
    .sort((a, b) => b - a);

  const currentYear = new Date().getFullYear();
  const initialYear = availableYears.includes(currentYear)
    ? String(currentYear)
    : String(availableYears[0]);

  const data: GithubStatsWidgetData = { ...stats, initialYear, availableYears };

  return <GithubStatsWidget id="github" title={t('title')} stats={data} />;
}
