import { pgEnum, timestamp } from 'drizzle-orm/pg-core';

export const LOCALES = ['en', 'es'] as const;
export const CONTENT_STATUSES = ['draft', 'published'] as const;

export const localeEnum = pgEnum('locale', LOCALES);
export const contentStatusEnum = pgEnum('content_status', CONTENT_STATUSES);

export const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export type Locale = (typeof LOCALES)[number];
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
