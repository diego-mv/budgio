import { ILogger, IUserRepository, User, UserSchema } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users, UserSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class UserDrizzleRepository
  extends GenericPostgresDrizzleRepository<UserSelect, User>
  implements IUserRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(users, db, logger, UserSchema.parse);
  }
}
