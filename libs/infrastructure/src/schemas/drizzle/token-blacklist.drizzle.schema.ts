import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { users } from './user.drizzle.schema';

export const user_tokens = pgTable('user_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id),
  token_hash: varchar('token_hash', { length: 255 }).notNull(),
  token_type: varchar('token_type', { length: 10 }).notNull(),
  issued_at: timestamp('issued_at', { withTimezone: true }) // Cuándo fue emitido el token
    .defaultNow()
    .notNull(),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(), //	Fecha en que el token expirará
  invalidated_at: timestamp('invalidated_at', { withTimezone: true }), // Cuándo se revocó el token manualmente o por lógic. null si el token sigue válido
  is_manual: boolean('is_manual').default(false), //Si fue revocado explícitamente (ej: logout, cambio contraseña)	true si se invalidó manualmente, false si fue automático (por lógica, reuse, etc)
});

export type UserTokenSelect = typeof user_tokens.$inferSelect;
export type UserTokenInsert = typeof user_tokens.$inferInsert;
