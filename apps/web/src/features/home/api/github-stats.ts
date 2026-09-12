import { cache } from 'react';

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

export interface GithubStatsData {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { language: string; count: number }[];
  years: Record<number, YearContributionData>;
}

const USERNAME = 'figueroaignacio';
const START_YEAR = 2024;

interface ContributionCalendarResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: GithubContributionDay[] }[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

const CONTRIBUTIONS_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`;

async function fetchYearContributions(
  year: number,
  headers: Record<string, string>,
): Promise<YearContributionData | null> {
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
  const now = new Date();

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          login: USERNAME,
          from: new Date(Date.UTC(year, 0, 1)).toISOString(),
          to: (to > now ? now : to).toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub contributions ${year}: HTTP ${response.status}`);
      return null;
    }

    const payload = (await response.json()) as ContributionCalendarResponse;

    if (payload.errors?.length) {
      console.error(`GitHub contributions ${year}:`, payload.errors[0].message);
      return null;
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      contributions: calendar.weeks.map((week) => week.contributionDays),
    };
  } catch (error) {
    console.error(`GitHub contributions ${year}:`, error);
    return null;
  }
}

export const getGithubStats = cache(async (): Promise<GithubStatsData | null> => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN is not set — skipping the GitHub stats section.');
    return null;
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'ignacio-portfolio',
    Authorization: `bearer ${token}`,
  };

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok) throw new Error(`Profile fetch failed: ${profileRes.status}`);
    if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.status}`);

    const profile = await profileRes.json();
    const repos = (await reposRes.json()) as Array<{
      stargazers_count: number;
      fork: boolean;
      language: string | null;
    }>;

    const nonForks = repos.filter((r) => !r.fork);
    const totalStars = nonForks.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    const langCounts: Record<string, number> = {};
    nonForks.forEach((r) => {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const currentYear = new Date().getFullYear();
    const yearsToFetch: number[] = [];
    for (let y = START_YEAR; y <= currentYear; y++) yearsToFetch.push(y);

    const fetched = await Promise.all(
      yearsToFetch.map(
        async (year) => [year, await fetchYearContributions(year, headers)] as const,
      ),
    );

    const years: Record<number, YearContributionData> = {};
    for (const [year, data] of fetched) {
      if (data) years[year] = data;
    }

    if (Object.keys(years).length === 0) return null;

    return {
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
      totalStars,
      topLanguages,
      years,
    };
  } catch (error) {
    console.error('Error fetching github stats:', error);
    return null;
  }
});
