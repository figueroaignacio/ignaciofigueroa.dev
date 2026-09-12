import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './common';

export const media = pgTable('media', {
  id: uuid().primaryKey().defaultRandom(),
  bucket: text().notNull(),
  path: text().notNull().unique(),
  url: text().notNull(),
  alt: text().notNull().default(''),
  mimeType: text().notNull(),
  size: integer().notNull(),
  width: integer(),
  height: integer(),
  ...timestamps,
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
