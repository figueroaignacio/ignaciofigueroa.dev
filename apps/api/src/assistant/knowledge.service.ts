import { Injectable } from '@nestjs/common';
import { cosineDistance, type Database, eq, portfolioKnowledge } from '@repo/db';
import { InjectDb } from '../db/inject-db.decorator';
import { EmbeddingsService } from './embeddings.service';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectDb() private readonly db: Database,
    private readonly embeddings: EmbeddingsService,
  ) {}

  async contextFor(query: string, locale: string, limit = 5): Promise<string> {
    const vector = await this.embeddings.embed(query);
    const rows = await this.db
      .select({ content: portfolioKnowledge.content, category: portfolioKnowledge.category })
      .from(portfolioKnowledge)
      .where(eq(portfolioKnowledge.locale, locale === 'es' ? 'es' : 'en'))
      .orderBy(cosineDistance(portfolioKnowledge.embedding, vector))
      .limit(limit);
    return rows.map((row) => `[${row.category}] ${row.content}`).join('\n\n');
  }

  async replaceAll(
    chunks: Array<{ content: string; category: string; locale: string }>,
  ): Promise<number> {
    const vectors = await this.embeddings.embedMany(chunks.map((chunk) => chunk.content));
    const rows = chunks.map((chunk, index) => ({ ...chunk, embedding: vectors[index] ?? null }));
    return this.db.transaction(async (tx) => {
      await tx.delete(portfolioKnowledge);
      if (rows.length) await tx.insert(portfolioKnowledge).values(rows);
      return rows.length;
    });
  }
}
