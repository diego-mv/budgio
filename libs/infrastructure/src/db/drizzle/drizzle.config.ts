import type { Config } from 'drizzle-kit';

export const config: Config = {
  dialect: 'postgresql',
  schema: './libs/infrastructure/schemas/drizzle/*ts',
  out: './libs/infrastructure/db/drizzle/migrations',
  verbose: true,
  strict: true,
};
