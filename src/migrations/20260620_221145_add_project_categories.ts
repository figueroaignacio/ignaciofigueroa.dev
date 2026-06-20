import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "project_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "projects_rels" ADD COLUMN "project_category_id" integer;
  ALTER TABLE "_projects_v_rels" ADD COLUMN "project_category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "project_category_id" integer;
  CREATE INDEX "project_category_updated_at_idx" ON "project_category" USING btree ("updated_at");
  CREATE INDEX "project_category_created_at_idx" ON "project_category" USING btree ("created_at");
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_project_category_fk" FOREIGN KEY ("project_category_id") REFERENCES "public"."project_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_project_category_fk" FOREIGN KEY ("project_category_id") REFERENCES "public"."project_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_category_fk" FOREIGN KEY ("project_category_id") REFERENCES "public"."project_category"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_project_category_id_idx" ON "projects_rels" USING btree ("project_category_id");
  CREATE INDEX "_projects_v_rels_project_category_id_idx" ON "_projects_v_rels" USING btree ("project_category_id");
  CREATE INDEX "payload_locked_documents_rels_project_category_id_idx" ON "payload_locked_documents_rels" USING btree ("project_category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_category" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "project_category" CASCADE;
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_project_category_fk";
  
  ALTER TABLE "_projects_v_rels" DROP CONSTRAINT "_projects_v_rels_project_category_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_project_category_fk";
  
  DROP INDEX "projects_rels_project_category_id_idx";
  DROP INDEX "_projects_v_rels_project_category_id_idx";
  DROP INDEX "payload_locked_documents_rels_project_category_id_idx";
  ALTER TABLE "projects_rels" DROP COLUMN "project_category_id";
  ALTER TABLE "_projects_v_rels" DROP COLUMN "project_category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "project_category_id";`)
}
