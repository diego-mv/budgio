import { UserToken } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface IUserTokenRepository extends IGenericRepository<UserToken> {}
