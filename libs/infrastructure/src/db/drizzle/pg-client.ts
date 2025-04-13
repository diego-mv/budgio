import { ILogger } from '@domain';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export function createDBClient(options: {
  dbConfig: {
    user: string;
    password: string;
    host: string;
    port?: number;
  };
  logger: ILogger;
  dbName: string;
}) {
  const { logger, dbName } = options;
  try {
    const { dbConfig } = options;

    const pool = new Pool({
      user: dbConfig.user,
      password: dbConfig.password,
      host: dbConfig.host,
      port: 5432,
      database: dbName,
      max: 35,
    });

    pool.on('error', (err) => {
      logger.error('Error inesperado en el pool de conexiones postgres:', {
        err,
      });
    });

    return drizzle(pool);
  } catch (error) {
    logger.error('Error al crear el cliente postgres de la base de datos:', {
      error,
    });
    throw error;
  }
}
