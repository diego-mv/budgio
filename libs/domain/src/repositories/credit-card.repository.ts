import { CreditCard, User } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface ICreditCardRepository extends IGenericRepository<CreditCard> {}
