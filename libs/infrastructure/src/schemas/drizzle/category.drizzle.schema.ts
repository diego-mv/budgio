import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: varchar('description', { length: 255 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type CategorySelect = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;
