import {
  CreditTransaction,
  ICreditTransactionRepository,
  ILogger,
  UserSchema,
} from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { credit_transactions, CreditTransactionSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class CreditTransactionDrizzleRepository
  extends GenericPostgresDrizzleRepository<
    CreditTransactionSelect,
    CreditTransaction
  >
  implements ICreditTransactionRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(credit_transactions, db, logger, UserSchema.parse);
  }
}
