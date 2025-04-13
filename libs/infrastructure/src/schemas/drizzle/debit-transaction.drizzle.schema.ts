import {
  pgTable,
  uuid,
  varchar,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
import { debit_cards } from './debit-card.drizzle.schema';
import { categories } from './category.drizzle.schema';

export const debit_transactions = pgTable('debit_transactions', {
  id: uuid('id').primaryKey(),
  debit_card_id: uuid('debit_card_id')
    .references(() => debit_cards.id)
    .notNull(),
  transaction_date: timestamp('transaction_date').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  description: varchar('description', { length: 255 }),
  category_id: uuid('category_id')
    .references(() => categories.id)
    .notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export type DebitTransactionSelect = typeof debit_transactions.$inferSelect;
export type DebitTransactionInsert = typeof debit_transactions.$inferInsert;
