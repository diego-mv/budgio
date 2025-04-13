import { CreditTransaction } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface ICreditTransactionRepository
  extends IGenericRepository<CreditTransaction> {}
