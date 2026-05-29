export interface GithubContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

export interface YearContributionData {
  totalContributions: number;
  contributions: GithubContributionDay[][];
}

export interface TopLanguage {
  language: string;
  count: number;
}

export interface GithubStatsClientProps {
  initialYear: string;
  availableYears: number[];
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: TopLanguage[];
  years: Record<number, YearContributionData>;
}
