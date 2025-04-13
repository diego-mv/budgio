import { User } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface IUserRepository extends IGenericRepository<User> {}
