export interface QueryParams<T> {
  pageIndex: number;
  pageSize: number;
  sort?: string;
  filter?: Partial<T>;
}

export interface IGenericRepository<T> {
  create(entity: Partial<T>): Promise<T>;
  getById(id: string): Promise<T | null>;
  list(options: QueryParams<T>): Promise<{ data: T[]; total: number }>;
  get(options: boolean): Promise<T[]>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  getAll(filter?: Partial<T>): Promise<T[]>;
}
