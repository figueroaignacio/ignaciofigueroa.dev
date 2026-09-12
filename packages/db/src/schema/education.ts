import { boolean, date, index, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { contentStatusEnum, localeEnum, timestamps } from './common';

export const education = pgTable(
  'education',
  {
    id: uuid().primaryKey().defaultRandom(),
    locale: localeEnum().notNull().default('en'),
    status: contentStatusEnum().notNull().default('draft'),
    title: text().notNull(),
    institution: text().notNull(),
    location: text(),
    description: text(),
    startDate: date().notNull(),
    endDate: date(),
    isCurrent: boolean().notNull().default(false),
    certificateUrl: text(),
    highlight: boolean().notNull().default(false),
    order: integer().notNull().default(0),
    ...timestamps,
  },
  (table) => [index('education_locale_status_idx').on(table.locale, table.status)],
);

export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
