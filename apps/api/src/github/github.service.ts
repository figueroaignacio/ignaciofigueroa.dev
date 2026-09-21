import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PullRequestDto } from '@repo/contracts';
import type { Env } from '../config/env';

interface FetchResult {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}

interface SearchResponse {
  items?: Array<{
    state: string;
    html_url: string;
    title: string;
    pull_request?: { merged_at?: string | null };
  }>;
}

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async fetchPullRequests(repository: string): Promise<PullRequestDto[] | null> {
    const match = repository.match(/github\.com\/([^/]+\/[^/]+)/);
    if (!match) return null;
    const repo = match[1].replace(/\.git$/, '');
    const username = this.config.get('GITHUB_USERNAME', { infer: true });
    const token = this.config.get('GITHUB_TOKEN', { infer: true });

    const query = `is:pr author:${username} repo:${repo}`;
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`;

    try {
      const response = (await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ignaciofigueroa.dev-api',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })) as unknown as FetchResult;
      if (!response.ok) {
        this.logger.warn(`GitHub search failed for ${repo}: ${response.status}`);
        return null;
      }
      const data = (await response.json()) as SearchResponse;
      return (data.items ?? [])
        .filter((item) => item.state === 'open' || Boolean(item.pull_request?.merged_at))
        .map((item) => ({ url: item.html_url, label: item.title }));
    } catch (error) {
      this.logger.warn(`GitHub search errored for ${repo}: ${(error as Error).message}`);
      return null;
    }
  }
}
