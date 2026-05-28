import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tech_icons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"svg" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "tech_stack" ADD COLUMN "icon_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tech_icons_id" integer;
  CREATE UNIQUE INDEX "tech_icons_name_idx" ON "tech_icons" USING btree ("name");
  CREATE INDEX "tech_icons_updated_at_idx" ON "tech_icons" USING btree ("updated_at");
  CREATE INDEX "tech_icons_created_at_idx" ON "tech_icons" USING btree ("created_at");
  ALTER TABLE "tech_stack" ADD CONSTRAINT "tech_stack_icon_id_tech_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."tech_icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_icons_fk" FOREIGN KEY ("tech_icons_id") REFERENCES "public"."tech_icons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tech_stack_icon_idx" ON "tech_stack" USING btree ("icon_id");
  CREATE INDEX "payload_locked_documents_rels_tech_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_icons_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tech_icons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tech_icons" CASCADE;
  ALTER TABLE "tech_stack" DROP CONSTRAINT "tech_stack_icon_id_tech_icons_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tech_icons_fk";
  
  DROP INDEX "tech_stack_icon_idx";
  DROP INDEX "payload_locked_documents_rels_tech_icons_id_idx";
  ALTER TABLE "tech_stack" DROP COLUMN "icon_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tech_icons_id";`);
}
