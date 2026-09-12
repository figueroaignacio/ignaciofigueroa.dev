import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type Database = PostgresJsDatabase<typeof schema>;

export function createDb(connectionString: string): Database {
  if (!connectionString) {
    throw new Error('createDb: connection string is required (DATABASE_URL)');
  }
  const client = postgres(connectionString, { prepare: false, max: 10 });
  return drizzle({ client, schema, casing: 'snake_case' });
}
