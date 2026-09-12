import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './common';

export const projectCategories = pgTable('project_categories', {
  id: uuid().primaryKey().defaultRandom(),
  label: text().notNull().unique(),
  slug: text().notNull().unique(),
  ...timestamps,
});

export const projectLabels = pgTable('project_labels', {
  id: uuid().primaryKey().defaultRandom(),
  label: text().notNull().unique(),
  ...timestamps,
});

export type ProjectCategory = typeof projectCategories.$inferSelect;
export type NewProjectCategory = typeof projectCategories.$inferInsert;
export type ProjectLabel = typeof projectLabels.$inferSelect;
export type NewProjectLabel = typeof projectLabels.$inferInsert;
