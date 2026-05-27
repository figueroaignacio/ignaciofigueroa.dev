import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "project_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "project_labels_id" integer;
  CREATE INDEX "project_labels_updated_at_idx" ON "project_labels" USING btree ("updated_at");
  CREATE INDEX "project_labels_created_at_idx" ON "project_labels" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_labels_fk" FOREIGN KEY ("project_labels_id") REFERENCES "public"."project_labels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_project_labels_id_idx" ON "payload_locked_documents_rels" USING btree ("project_labels_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "project_labels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "project_labels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_project_labels_fk";
  
  DROP INDEX "payload_locked_documents_rels_project_labels_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "project_labels_id";`);
}
