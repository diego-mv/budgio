import { DebitTransaction } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface IDebitTransactionRepository
  extends IGenericRepository<DebitTransaction> {}
