import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { contentStatusEnum, localeEnum, timestamps } from './common';
import { media } from './media';
import { projectCategories, projectLabels } from './taxonomies';
import { techStack } from './tech';

export const projects = pgTable(
  'projects',
  {
    id: uuid().primaryKey().defaultRandom(),
    locale: localeEnum().notNull().default('en'),
    status: contentStatusEnum().notNull().default('draft'),
    title: text().notNull(),
    subtitle: text().notNull().default(''),
    slug: text().notNull().unique(),
    description: text().notNull().default(''),
    body: text().notNull().default(''),
    icon: text(),
    imageId: uuid().references(() => media.id, { onDelete: 'set null' }),
    videoUrl: text(),
    repository: text(),
    demo: text(),
    isCommercial: boolean().notNull().default(false),
    order: integer().notNull().default(0),
    publishedAt: timestamp({ withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index('projects_locale_status_idx').on(table.locale, table.status),
    index('projects_order_idx').on(table.order),
  ],
);

export const projectTechnologies = pgTable(
  'project_technologies',
  {
    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    techId: uuid()
      .notNull()
      .references(() => techStack.id, { onDelete: 'cascade' }),
    position: integer().notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.techId] })],
);

export const projectToLabels = pgTable(
  'project_to_labels',
  {
    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    labelId: uuid()
      .notNull()
      .references(() => projectLabels.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.labelId] })],
);

export const projectToCategories = pgTable(
  'project_to_categories',
  {
    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    categoryId: uuid()
      .notNull()
      .references(() => projectCategories.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.categoryId] })],
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  image: one(media, { fields: [projects.imageId], references: [media.id] }),
  technologies: many(projectTechnologies),
  labels: many(projectToLabels),
  categories: many(projectToCategories),
}));

export const projectTechnologiesRelations = relations(projectTechnologies, ({ one }) => ({
  project: one(projects, { fields: [projectTechnologies.projectId], references: [projects.id] }),
  tech: one(techStack, { fields: [projectTechnologies.techId], references: [techStack.id] }),
}));

export const projectToLabelsRelations = relations(projectToLabels, ({ one }) => ({
  project: one(projects, { fields: [projectToLabels.projectId], references: [projects.id] }),
  label: one(projectLabels, { fields: [projectToLabels.labelId], references: [projectLabels.id] }),
}));

export const projectToCategoriesRelations = relations(projectToCategories, ({ one }) => ({
  project: one(projects, { fields: [projectToCategories.projectId], references: [projects.id] }),
  category: one(projectCategories, {
    fields: [projectToCategories.categoryId],
    references: [projectCategories.id],
  }),
}));

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
