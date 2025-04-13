import { ILogger } from '@domain';
import { asc, desc, sql, SQL } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';

export const buildSortersSQL = (
  table: PgTable,
  sort: string,
  mapping?: Record<string, PgColumn>,
  logger?: ILogger
): SQL[] => {
  try {
    const sortersSQL: SQL[] = [];
    const mappingValues: Record<string, 'asc' | 'desc'> = {
      asc: 'asc',
      desc: 'desc',
      ascend: 'asc',
      descend: 'desc',
    };
    const sortParsed = JSON.parse(sort) as Record<string, string>;
    if (Object.keys(sortParsed).length === 0) return sortersSQL;

    for (const [key, value] of Object.entries(sortParsed)) {
      let column: PgColumn | undefined;
      if (key && key in table) {
        column = (table as unknown)[key];
      } else if (mapping && key in mapping) {
        column = mapping[key];
      }
      if (!column || !value || !(value in mappingValues)) return sortersSQL;

      if (mappingValues[value] === 'asc') {
        sortersSQL.push(asc(column));
      } else if (mappingValues[value] === 'desc') {
        sortersSQL.push(desc(column));
      }
    }

    return sortersSQL;
  } catch (e: unknown) {
    logger?.error('Error building sorters, set to empty by default', e);
    return [];
  }
};

export const buildFilter = <T>(
  table: PgTable,
  filter: Partial<T>,
  conditions: SQL[],
  relations?: Record<string, PgTable>
): SQL[] => {
  const filters = Object.entries<unknown>(filter);
  if (!filters.length) return conditions ?? [];
  for (const [key, value] of filters) {
    if (relations && key in relations) {
      buildFilter(relations[key], value, conditions, relations);
    } else if (key in table) {
      const columnTable = (table as unknown)[key];
      if (columnTable) {
        conditions.push(
          sql`${columnTable}::text ilike ${`%${
            typeof value === 'string' ? value?.trim() : value
          }%`}`
        );
      }
    }
  }

  return conditions;
};
