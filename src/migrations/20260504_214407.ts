import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contributions_pull_requests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"label" varchar
  );

  CREATE TABLE "_contributions_v_version_pull_requests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "contributions_pull_requests" ADD CONSTRAINT "contributions_pull_requests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_version_pull_requests" ADD CONSTRAINT "_contributions_v_version_pull_requests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contributions_pull_requests_order_idx" ON "contributions_pull_requests" USING btree ("_order");
  CREATE INDEX "contributions_pull_requests_parent_id_idx" ON "contributions_pull_requests" USING btree ("_parent_id");
  CREATE INDEX "_contributions_v_version_pull_requests_order_idx" ON "_contributions_v_version_pull_requests" USING btree ("_order");
  CREATE INDEX "_contributions_v_version_pull_requests_parent_id_idx" ON "_contributions_v_version_pull_requests" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contributions_pull_requests" CASCADE;
  DROP TABLE "_contributions_v_version_pull_requests" CASCADE;`);
}
