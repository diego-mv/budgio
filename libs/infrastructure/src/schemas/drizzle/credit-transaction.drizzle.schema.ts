import {
  pgTable,
  uuid,
  varchar,
  decimal,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { credit_cards } from './credit-card.drizzle.schema';
import { categories } from './category.drizzle.schema';

export const credit_transactions = pgTable('credit_transactions', {
  id: uuid('id').primaryKey(),
  credit_card_id: uuid('credit_card_id')
    .references(() => credit_cards.id)
    .notNull(),
  transaction_date: timestamp('transaction_date').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  description: varchar('description', { length: 255 }),
  category_id: uuid('category_id')
    .references(() => categories.id)
    .notNull(),
  total_installments: integer('total_installments').default(1).notNull(),
  installment_number: integer('installment_number').default(1).notNull(),
  applied_interest_rate: decimal('applied_interest_rate', {
    precision: 5,
    scale: 2,
  }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export type CreditTransactionSelect = typeof credit_transactions.$inferSelect;
export type CreditTransactionInsert = typeof credit_transactions.$inferInsert;
