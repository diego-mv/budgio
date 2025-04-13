import { Bank, IBankRepository, ILogger, UserSchema } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { banks, BankSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class BankDrizzleRepository
  extends GenericPostgresDrizzleRepository<BankSelect, Bank>
  implements IBankRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(banks, db, logger, UserSchema.parse);
  }
}
