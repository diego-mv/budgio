import {
  pgTable,
  uuid,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
import { categories } from './category.drizzle.schema';
import { users } from './user.drizzle.schema';

export const monthly_budgets = pgTable('monthly_budgets', {
  id: uuid('id').primaryKey(),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  category_id: uuid('category_id')
    .references(() => categories.id)
    .notNull(),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  budget_amount: decimal('budget_amount', {
    precision: 15,
    scale: 2,
  }).notNull(),
  spent_amount: decimal('spent_amount', { precision: 15, scale: 2 })
    .default('0')
    .notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type MonthlyBudgetSelect = typeof monthly_budgets.$inferSelect;
export type MonthlyBudgetInsert = typeof monthly_budgets.$inferInsert;
