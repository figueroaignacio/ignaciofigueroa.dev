import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contributions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contributions_v_version_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__contributions_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_contributions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_locale" "enum__contributions_v_version_locale" DEFAULT 'en',
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_repository" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__contributions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );

  CREATE TABLE "_contributions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tech_stack_id" integer
  );

  ALTER TABLE "contributions" ALTER COLUMN "locale" DROP NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "repository" DROP NOT NULL;
  ALTER TABLE "contributions" ADD COLUMN "_status" "enum_contributions_status" DEFAULT 'draft';
  ALTER TABLE "_contributions_v" ADD CONSTRAINT "_contributions_v_parent_id_contributions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contributions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contributions_v_rels" ADD CONSTRAINT "_contributions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_rels" ADD CONSTRAINT "_contributions_v_rels_tech_stack_fk" FOREIGN KEY ("tech_stack_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_contributions_v_parent_idx" ON "_contributions_v" USING btree ("parent_id");
  CREATE INDEX "_contributions_v_version_version_updated_at_idx" ON "_contributions_v" USING btree ("version_updated_at");
  CREATE INDEX "_contributions_v_version_version_created_at_idx" ON "_contributions_v" USING btree ("version_created_at");
  CREATE INDEX "_contributions_v_version_version__status_idx" ON "_contributions_v" USING btree ("version__status");
  CREATE INDEX "_contributions_v_created_at_idx" ON "_contributions_v" USING btree ("created_at");
  CREATE INDEX "_contributions_v_updated_at_idx" ON "_contributions_v" USING btree ("updated_at");
  CREATE INDEX "_contributions_v_latest_idx" ON "_contributions_v" USING btree ("latest");
  CREATE INDEX "_contributions_v_rels_order_idx" ON "_contributions_v_rels" USING btree ("order");
  CREATE INDEX "_contributions_v_rels_parent_idx" ON "_contributions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_contributions_v_rels_path_idx" ON "_contributions_v_rels" USING btree ("path");
  CREATE INDEX "_contributions_v_rels_tech_stack_id_idx" ON "_contributions_v_rels" USING btree ("tech_stack_id");
  CREATE INDEX "contributions__status_idx" ON "contributions" USING btree ("_status");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_contributions_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contributions_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_contributions_v" CASCADE;
  DROP TABLE "_contributions_v_rels" CASCADE;
  DROP INDEX "contributions__status_idx";
  ALTER TABLE "contributions" ALTER COLUMN "locale" SET NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "contributions" ALTER COLUMN "repository" SET NOT NULL;
  ALTER TABLE "contributions" DROP COLUMN "_status";
  DROP TYPE "public"."enum_contributions_status";
  DROP TYPE "public"."enum__contributions_v_version_locale";
  DROP TYPE "public"."enum__contributions_v_version_status";`);
}
