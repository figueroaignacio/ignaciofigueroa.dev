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

export const getGithubStats = cache(async (): Promise<GithubStatsData | null> => {
  const username = 'figueroaignacio';
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'ignacio-portfolio',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch user profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!profileRes.ok) {
      throw new Error(`Profile fetch failed: ${profileRes.statusText}`);
    }
    const profile = await profileRes.json();

    // 2. Fetch repos for stars & languages
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!reposRes.ok) {
      throw new Error(`Repos fetch failed: ${reposRes.statusText}`);
    }

    const repos = (await reposRes.json()) as Array<{
      stargazers_count: number;
      fork: boolean;
      language: string | null;
    }>;

    const nonForks = repos.filter((r) => !r.fork);
    const totalStars = nonForks.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    // Calculate top languages
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

    // 3. Fetch contributions per year in parallel
    const yearsData: Record<number, YearContributionData> = {};
    const yearsToFetch: number[] = [];
    for (let y = startYear; y <= currentYear; y++) {
      yearsToFetch.push(y);
    }

    await Promise.all(
      yearsToFetch.map(async (year) => {
        try {
          const contribsRes = await fetch(
            `https://github-contributions-api.deno.dev/${username}.json?from=${year}-01-01&to=${year}-12-31`,
            { next: { revalidate: 3600 } },
          );

          if (contribsRes.ok) {
            const data = await contribsRes.json();
            yearsData[year] = {
              totalContributions: data.totalContributions || 0,
              contributions: data.contributions || [],
            };
          } else {
            console.error(`Failed to fetch contributions for ${year}: ${contribsRes.statusText}`);
          }
        } catch (err) {
          console.error(`Error fetching contributions for ${year}:`, err);
        }
      }),
    );

    // Verify we have data for all years, otherwise we will let components generate fallbacks
    return {
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
      totalStars,
      topLanguages,
      years: yearsData,
    };
  } catch (error) {
    console.error('Error fetching github stats:', error);
    return null;
  }
});
