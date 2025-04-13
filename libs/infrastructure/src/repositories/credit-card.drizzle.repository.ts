import {
  CreditCard,
  ICreditCardRepository,
  ILogger,
  UserSchema,
} from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { credit_cards, CreditCardSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class CreditCardDrizzleRepository
  extends GenericPostgresDrizzleRepository<CreditCardSelect, CreditCard>
  implements ICreditCardRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(credit_cards, db, logger, UserSchema.parse);
  }
}
