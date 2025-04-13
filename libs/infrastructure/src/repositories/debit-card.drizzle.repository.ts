import { DebitCard, IDebitCardRepository, ILogger, UserSchema } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { debit_cards, DebitCardSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class DebitCardDrizzleRepository
  extends GenericPostgresDrizzleRepository<DebitCardSelect, DebitCard>
  implements IDebitCardRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(debit_cards, db, logger, UserSchema.parse);
  }
}
