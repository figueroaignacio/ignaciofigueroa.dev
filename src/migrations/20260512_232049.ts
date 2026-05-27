import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "is_commercial_project" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_is_commercial_project" boolean DEFAULT false;
  ALTER TABLE "projects" DROP COLUMN "featured";
  ALTER TABLE "_projects_v" DROP COLUMN "version_featured";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "projects" DROP COLUMN "is_commercial_project";
  ALTER TABLE "_projects_v" DROP COLUMN "version_is_commercial_project";`);
}
