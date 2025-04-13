import {
  pgTable,
  uuid,
  varchar,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
import { banks } from './bank.drizzle.schema';
import { users } from './user.drizzle.schema';

export const debit_cards = pgTable('debit_cards', {
  id: uuid('id').primaryKey(),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bank_id: uuid('bank_id')
    .references(() => banks.id)
    .notNull(),
  card_name: varchar('card_name', { length: 100 }).notNull(),
  color: varchar('color', { length: 20 }),
  current_balance: decimal('current_balance', {
    precision: 15,
    scale: 2,
  }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type DebitCardSelect = typeof debit_cards.$inferSelect;
export type DebitCardInsert = typeof debit_cards.$inferInsert;
