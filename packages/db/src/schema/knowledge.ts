import { index, integer, pgTable, text, vector } from 'drizzle-orm/pg-core';
import { timestamps } from './common';

export const portfolioKnowledge = pgTable(
  'portfolio_knowledge',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: text().notNull(),
    category: text().notNull(),
    locale: text().notNull().default('en'),
    embedding: vector({ dimensions: 384 }),
    ...timestamps,
  },
  (table) => [
    index('portfolio_knowledge_locale_idx').on(table.locale),
    index('portfolio_knowledge_embedding_idx').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops'),
    ),
  ],
);

export type PortfolioKnowledge = typeof portfolioKnowledge.$inferSelect;
export type NewPortfolioKnowledge = typeof portfolioKnowledge.$inferInsert;
