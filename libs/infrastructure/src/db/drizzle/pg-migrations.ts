import { ILogger } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as path from 'path';

export async function runDrizzleMigrations(
  logger: ILogger,
  db: NodePgDatabase<Record<string, never>>
) {
  try {
    const migrationsFolder = path.resolve(
      process.cwd(),
      'libs/infrastructure/src/db/drizzle/migrations'
    );
    logger.log(`Running migrations over folder: ${migrationsFolder}`);

    await migrate(db, {
      migrationsFolder,
      migrationsSchema: 'public',
      migrationsTable: '__drizzle_migrations',
    });
    logger.log('Migrations executed successfully');
  } catch (error: unknown) {
    logger.error('Error on running migrations', error);
    throw error;
  }
}
