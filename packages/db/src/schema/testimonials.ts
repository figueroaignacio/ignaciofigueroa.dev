import { date, index, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { contentStatusEnum, localeEnum, timestamps } from './common';

export const testimonials = pgTable(
  'testimonials',
  {
    id: uuid().primaryKey().defaultRandom(),
    locale: localeEnum().notNull().default('en'),
    status: contentStatusEnum().notNull().default('draft'),
    name: text().notNull(),
    role: text().notNull(),
    company: text(),
    avatar: text(),
    testimonial: text().notNull(),
    date: date(),
    order: integer().notNull().default(0),
    ...timestamps,
  },
  (table) => [index('testimonials_locale_status_idx').on(table.locale, table.status)],
);

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
