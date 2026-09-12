import { boolean, date, index, integer, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { contentStatusEnum, localeEnum, timestamps } from './common';

export const experiences = pgTable(
  'experiences',
  {
    id: uuid().primaryKey().defaultRandom(),
    locale: localeEnum().notNull().default('en'),
    status: contentStatusEnum().notNull().default('draft'),
    title: text().notNull(),
    company: text().notNull(),
    location: text(),
    tasks: jsonb().$type<string[]>().notNull().default([]),
    technologies: jsonb().$type<string[]>().notNull().default([]),
    startDate: date().notNull(),
    endDate: date(),
    isCurrent: boolean().notNull().default(false),
    link: text(),
    order: integer().notNull().default(0),
    ...timestamps,
  },
  (table) => [index('experiences_locale_status_idx').on(table.locale, table.status)],
);

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
