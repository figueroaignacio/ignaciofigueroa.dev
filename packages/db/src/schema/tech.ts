import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './common';

export const techIcons = pgTable('tech_icons', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  svg: text().notNull(),
  ...timestamps,
});

export const techStack = pgTable('tech_stack', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  iconId: uuid().references(() => techIcons.id, { onDelete: 'set null' }),
  ...timestamps,
});

export const techIconsRelations = relations(techIcons, ({ many }) => ({
  technologies: many(techStack),
}));

export const techStackRelations = relations(techStack, ({ one }) => ({
  icon: one(techIcons, { fields: [techStack.iconId], references: [techIcons.id] }),
}));

export type TechIcon = typeof techIcons.$inferSelect;
export type NewTechIcon = typeof techIcons.$inferInsert;
export type TechStack = typeof techStack.$inferSelect;
export type NewTechStack = typeof techStack.$inferInsert;
