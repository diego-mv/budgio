import { Category } from '../schemas';
import { IGenericRepository } from './generic.repository';

export interface ICategoryRepository extends IGenericRepository<Category> {}
