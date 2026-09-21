import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env';

const MODEL_URL =
  'https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction';
const MAX_ATTEMPTS = 5;
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

interface FetchResult {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}

@Injectable()
export class EmbeddingsService {
  private readonly logger = new Logger(EmbeddingsService.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async embed(text: string): Promise<number[]> {
    const [vector] = await this.embedMany([text]);
    return vector ?? [];
  }

  async embedMany(texts: string[]): Promise<number[][]> {
    const token = this.config.get('HF_TOKEN', { infer: true });
    if (!token) throw new ServiceUnavailableException('HF_TOKEN is not configured');
    if (texts.length === 0) return [];

    let lastError: unknown;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      try {
        const response = (await fetch(MODEL_URL, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
          body: JSON.stringify({ inputs: texts }),
          signal: AbortSignal.timeout(60_000),
        })) as unknown as FetchResult;

        if (!response.ok) {
          if (!RETRYABLE.has(response.status)) {
            throw new ServiceUnavailableException(`Embedding request failed: ${response.status}`);
          }
          lastError = new Error(`HTTP ${response.status}`);
        } else {
          const result = (await response.json()) as number[] | number[][];
          return Array.isArray(result[0]) ? (result as number[][]) : [result as number[]];
        }
      } catch (error) {
        if (error instanceof ServiceUnavailableException) throw error;
        lastError = error;
      }

      const delay = 2 ** attempt * 1000;
      this.logger.warn(`Embedding attempt ${attempt + 1} failed, retrying in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new ServiceUnavailableException(
      `Embedding request failed: ${lastError instanceof Error ? lastError.message : 'unknown'}`,
    );
  }
}
