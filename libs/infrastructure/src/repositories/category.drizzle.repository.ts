import { Category, ICategoryRepository, ILogger, UserSchema } from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { categories, CategorySelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class CategoryDrizzleRepository
  extends GenericPostgresDrizzleRepository<CategorySelect, Category>
  implements ICategoryRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(categories, db, logger, UserSchema.parse);
  }
}
