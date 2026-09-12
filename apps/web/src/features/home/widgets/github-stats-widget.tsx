import { Section } from '@/shared/components/ui/section';
import type { GithubStatsData } from '../api/github-stats';
import { GithubStatsClient } from '../ui/github-stats-client';
import { GithubStatsSkeleton } from '../ui/github-stats-skeleton';

export interface GithubStatsWidgetData extends GithubStatsData {
  initialYear: string;
  availableYears: number[];
}

interface GithubStatsWidgetProps {
  id: string;
  title?: string;
  stats?: GithubStatsWidgetData | null;
}

export function GithubStatsWidget({ id, title = '', stats }: GithubStatsWidgetProps) {
  if (stats === undefined) return <GithubStatsSkeleton />;
  if (stats === null) return null;

  return (
    <Section id={id} title={title}>
      <GithubStatsClient
        initialYear={stats.initialYear}
        availableYears={stats.availableYears}
        publicRepos={stats.publicRepos}
        followers={stats.followers}
        following={stats.following}
        totalStars={stats.totalStars}
        topLanguages={stats.topLanguages}
        years={stats.years}
      />
    </Section>
  );
}
