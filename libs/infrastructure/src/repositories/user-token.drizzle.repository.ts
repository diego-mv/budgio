import { ILogger, IUserTokenRepository, UserSchema, UserToken } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { user_tokens, UserTokenSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class UserTokenDrizzleRepository
  extends GenericPostgresDrizzleRepository<UserTokenSelect, UserToken>
  implements IUserTokenRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(user_tokens, db, logger, UserSchema.parse);
  }
}
