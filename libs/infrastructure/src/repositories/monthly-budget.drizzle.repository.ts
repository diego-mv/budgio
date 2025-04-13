import {
  ILogger,
  IMonthlyBudgetRepository,
  MonthlyBudget,
  UserSchema,
} from '@domain';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { monthly_budgets, MonthlyBudgetSelect } from '../schemas';
import { GenericPostgresDrizzleRepository } from './generic.drizzle.repository';

export class MonthlyBudgetDrizzleRepository
  extends GenericPostgresDrizzleRepository<MonthlyBudgetSelect, MonthlyBudget>
  implements IMonthlyBudgetRepository
{
  constructor(readonly db: NodePgDatabase, readonly logger: ILogger) {
    super(monthly_budgets, db, logger, UserSchema.parse);
  }
}
