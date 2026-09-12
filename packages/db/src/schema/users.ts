import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from './common';

export const userRoleEnum = pgEnum('user_role', ['admin']);

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  name: text(),
  role: userRoleEnum().notNull().default('admin'),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
