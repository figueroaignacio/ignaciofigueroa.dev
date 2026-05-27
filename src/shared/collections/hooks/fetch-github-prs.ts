import type { Contribution } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

export const fetchGithubPrs: CollectionBeforeChangeHook<Contribution> = async ({ data }) => {
  const repository = data.repository;

  if (!repository) return data;

  try {
    const repoMatch = repository.match(/(?:github\.com\/|)([^\/]+\/[^\/]+)/);
    if (!repoMatch) return data;

    const repoPath = repoMatch[1].replace(/\.git$/, '');
    const username = 'figueroaignacio';

    const query = `is:pr author:${username} repo:${repoPath}`;
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'ignacio-portfolio',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch PRs from GitHub: ${response.statusText}`);
      return data;
    }

    const result = (await response.json()) as {
      items: Array<{
        state: string;
        html_url: string;
        title: string;
        pull_request?: {
          merged_at?: string | null;
        };
      }>;
    };

    const items = result.items || [];

    const filteredItems = items.filter((item) => {
      const isOpen = item.state === 'open';
      const isMerged = !!item.pull_request?.merged_at;
      return isOpen || isMerged;
    });

    const pullRequests = filteredItems.map((item) => ({
      url: item.html_url,
      label: item.title,
    }));

    return {
      ...data,
      pullRequests,
    };
  } catch (error) {
    console.error('Error in fetchGithubPrs hook:', error);
    return data;
  }
};
