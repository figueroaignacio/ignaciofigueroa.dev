import { relations } from 'drizzle-orm';
import { index, integer, jsonb, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { contentStatusEnum, localeEnum, timestamps } from './common';
import { techStack } from './tech';

export type PullRequest = { url: string; label: string | null };

export const contributions = pgTable(
  'contributions',
  {
    id: uuid().primaryKey().defaultRandom(),
    locale: localeEnum().notNull().default('en'),
    status: contentStatusEnum().notNull().default('draft'),
    title: text().notNull(),
    description: text().notNull(),
    repository: text().notNull(),
    fork: text(),
    pullRequests: jsonb().$type<PullRequest[]>().notNull().default([]),
    order: integer().notNull().default(0),
    ...timestamps,
  },
  (table) => [index('contributions_locale_status_idx').on(table.locale, table.status)],
);

export const contributionTechnologies = pgTable(
  'contribution_technologies',
  {
    contributionId: uuid()
      .notNull()
      .references(() => contributions.id, { onDelete: 'cascade' }),
    techId: uuid()
      .notNull()
      .references(() => techStack.id, { onDelete: 'cascade' }),
    position: integer().notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.contributionId, table.techId] })],
);

export const contributionsRelations = relations(contributions, ({ many }) => ({
  technologies: many(contributionTechnologies),
}));

export const contributionTechnologiesRelations = relations(contributionTechnologies, ({ one }) => ({
  contribution: one(contributions, {
    fields: [contributionTechnologies.contributionId],
    references: [contributions.id],
  }),
  tech: one(techStack, { fields: [contributionTechnologies.techId], references: [techStack.id] }),
}));

export type Contribution = typeof contributions.$inferSelect;
export type NewContribution = typeof contributions.$inferInsert;
