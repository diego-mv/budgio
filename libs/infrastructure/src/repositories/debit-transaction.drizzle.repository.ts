import {
  DebitTransaction,
  IDebitTransactionRepository,
  ILogger,
  UserSchema,
} from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { debit_transactions, DebitTransactionSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class DebitTransactionDrizzleRepository
  extends GenericPostgresDrizzleRepository<
    DebitTransactionSelect,
    DebitTransaction
  >
  implements IDebitTransactionRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(debit_transactions, db, logger, UserSchema.parse);
  }
}
