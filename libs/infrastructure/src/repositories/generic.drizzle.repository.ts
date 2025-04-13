import { IGenericRepository, ILogger, QueryParams } from '@domain';
import { and, SQL, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';
import { buildFilter, buildSortersSQL } from '../db';
import { NotFoundException } from '@nestjs/common';

export class GenericPostgresDrizzleRepository<V extends { id: string }, T>
  implements IGenericRepository<T>
{
  constructor(
    readonly table: PgTable,
    readonly db: NodePgDatabase,
    readonly logger: ILogger,
    readonly mapper: (entity: V) => T
  ) {}

  async list(options: QueryParams<T>): Promise<{ data: T[]; total: number }> {
    try {
      const {
        pageIndex: index,
        pageSize: size,
        sort,
        filter,
      } = options || {
        pageIndex: 0,
        pageSize: 10,
        filter: undefined,
        sort: undefined,
      };
      const pageIndex = Number(index);
      const pageSize = Number(size);

      const baseQuery = this.db.select().from(this.table);

      const conditions: SQL[] = [];
      if (filter) {
        const conditions = buildFilter(this.table, filter, []);
        if (conditions.length > 0) {
          baseQuery.where(and(...conditions));
        }
      }

      if (sort) {
        const sortersSQL = buildSortersSQL(this.table, sort);
        if (sortersSQL.length > 0) {
          baseQuery.orderBy(...sortersSQL);
        }
      }

      const paginatedQuery = baseQuery
        .limit(pageSize)
        .offset(pageIndex * pageSize);

      const entries = await paginatedQuery.execute();
      const total = await this.db.$count(this.table, and(...conditions));

      const data = entries
        ? entries.map((entity) => this.mapper(entity as V))
        : [];

      return {
        data,
        total,
      };
    } catch (error: unknown) {
      this.logger.error('Error on list', error);
      throw error;
    }
  }

  async create(entity: Partial<T>): Promise<T> {
    try {
      const [created] = await this.db
        .insert(this.table)
        .values(entity)
        .returning();
      return this.mapper(created as V);
    } catch (error: unknown) {
      this.logger.error('Error on create', error);
      throw error;
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const [entity] = await this.db
        .select()
        .from(this.table)
        .where(sql`id::text = ${id}`);
      return entity ? this.mapper(entity as V) : null;
    } catch (error: unknown) {
      this.logger.error('Error on getById', error);
      throw error;
    }
  }

  async get(active: boolean): Promise<T[]> {
    try {
      const queryBase = this.db.select().from(this.table);
      if (active) {
        queryBase.where(sql`active = true`);
      }
      const entities = (await queryBase.execute()) as V[];
      return entities.map((entity) => this.mapper(entity));
    } catch (error: unknown) {
      this.logger.error('Error on get', error);
      throw error;
    }
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    try {
      const [updated] = await this.db
        .update(this.table)
        .set(entity)
        .where(sql`id::text = ${id}`)
        .returning();

      if (!updated) {
        throw new Error('Error update');
      }

      return this.mapper(updated as V);
    } catch (error: unknown) {
      this.logger.error('Error on update', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const exists = await this.getById(id);
      if (!exists) {
        throw new NotFoundException('id', id);
      }
      await this.db.delete(this.table).where(sql`id::text=${id}`);
    } catch (error: unknown) {
      this.logger.error('Error on delete entity', error);
      throw error;
    }
  }

  async getAll(filter?: Partial<T>): Promise<T[]> {
    const baseQuery = this.db.select().from(this.table);

    if (filter) {
      const conditions = buildFilter(this.table, filter, []);
      if (conditions.length > 0) {
        baseQuery.where(and(...conditions));
      }
    }
    const entries = await baseQuery.execute();

    return entries ? entries.map((entry) => this.mapper(entry as V)) : [];
  }
}
