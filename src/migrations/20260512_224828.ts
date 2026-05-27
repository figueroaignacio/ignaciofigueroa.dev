import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_rels" ADD COLUMN "project_labels_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "project_labels_id" integer;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_project_labels_fk" FOREIGN KEY ("project_labels_id") REFERENCES "public"."project_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_project_labels_fk" FOREIGN KEY ("project_labels_id") REFERENCES "public"."project_labels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_project_labels_id_idx" ON "projects_rels" USING btree ("project_labels_id");
  CREATE INDEX "_projects_v_rels_project_labels_id_idx" ON "_projects_v_rels" USING btree ("project_labels_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_project_labels_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_project_labels_fk";
  
  DROP INDEX "projects_rels_project_labels_id_idx";
  DROP INDEX "_projects_v_rels_project_labels_id_idx";
  ALTER TABLE "projects_rels" DROP COLUMN "project_labels_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "project_labels_id";`);
}
