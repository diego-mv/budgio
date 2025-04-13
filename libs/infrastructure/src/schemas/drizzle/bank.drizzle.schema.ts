import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const banks = pgTable('banks', {
  id: uuid('id').primaryKey(),
  bank_name: varchar('bank_name', { length: 100 }).notNull(),
  country: varchar('country', { length: 50 }),
  website: varchar('website', { length: 100 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type BankSelect = typeof banks.$inferSelect;
export type BankInsert = typeof banks.$inferInsert;
