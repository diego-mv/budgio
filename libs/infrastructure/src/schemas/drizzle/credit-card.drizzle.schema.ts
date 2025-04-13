import {
  pgTable,
  uuid,
  varchar,
  decimal,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './user.drizzle.schema';
import { banks } from './bank.drizzle.schema';

export const credit_cards = pgTable('credit_cards', {
  id: uuid('id').primaryKey(),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bank_id: uuid('bank_id')
    .references(() => banks.id)
    .notNull(),
  card_name: varchar('card_name', { length: 100 }).notNull(),
  credit_limit: decimal('credit_limit', { precision: 15, scale: 2 }).notNull(),
  color: varchar('color', { length: 20 }),
  expiration_date: date('expiration_date'),
  interest_rate: decimal('interest_rate', { precision: 5, scale: 2 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type CreditCardSelect = typeof credit_cards.$inferSelect;
export type CreditCardInsert = typeof credit_cards.$inferInsert;
