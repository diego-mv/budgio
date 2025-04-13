import { MonthlyBudget } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface IMonthlyBudgetRepository
  extends IGenericRepository<MonthlyBudget> {}
