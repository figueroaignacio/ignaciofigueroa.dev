import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {}
