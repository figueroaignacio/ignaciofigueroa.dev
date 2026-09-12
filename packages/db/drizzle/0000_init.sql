CREATE TYPE "public"."content_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('en', 'es');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin');--> statement-breakpoint
CREATE TABLE "contribution_technologies" (
	"contribution_id" uuid NOT NULL,
	"tech_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "contribution_technologies_contribution_id_tech_id_pk" PRIMARY KEY("contribution_id","tech_id")
);
--> statement-breakpoint
CREATE TABLE "contributions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"repository" text NOT NULL,
	"fork" text,
	"pull_requests" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"institution" text NOT NULL,
	"location" text,
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date,
	"is_current" boolean DEFAULT false NOT NULL,
	"certificate_url" text,
	"highlight" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text,
	"tasks" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"technologies" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"is_current" boolean DEFAULT false NOT NULL,
	"link" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bucket" text NOT NULL,
	"path" text NOT NULL,
	"url" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"mime_type" text NOT NULL,
	"size" integer NOT NULL,
	"width" integer,
	"height" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "project_technologies" (
	"project_id" uuid NOT NULL,
	"tech_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_technologies_project_id_tech_id_pk" PRIMARY KEY("project_id","tech_id")
);
--> statement-breakpoint
CREATE TABLE "project_to_categories" (
	"project_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "project_to_categories_project_id_category_id_pk" PRIMARY KEY("project_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "project_to_labels" (
	"project_id" uuid NOT NULL,
	"label_id" uuid NOT NULL,
	CONSTRAINT "project_to_labels_project_id_label_id_pk" PRIMARY KEY("project_id","label_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"subtitle" text DEFAULT '' NOT NULL,
	"slug" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"icon" text,
	"image_id" uuid,
	"video_url" text,
	"repository" text,
	"demo" text,
	"is_commercial" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_categories_label_unique" UNIQUE("label"),
	CONSTRAINT "project_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_labels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_labels_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "tech_icons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"svg" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tech_icons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "tech_stack" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tech_stack_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"company" text,
	"avatar" text,
	"testimonial" text NOT NULL,
	"date" date,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text,
	"role" "user_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contribution_technologies" ADD CONSTRAINT "contribution_technologies_contribution_id_contributions_id_fk" FOREIGN KEY ("contribution_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contribution_technologies" ADD CONSTRAINT "contribution_technologies_tech_id_tech_stack_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_tech_id_tech_stack_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech_stack"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_to_categories" ADD CONSTRAINT "project_to_categories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_to_categories" ADD CONSTRAINT "project_to_categories_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_to_labels" ADD CONSTRAINT "project_to_labels_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_to_labels" ADD CONSTRAINT "project_to_labels_label_id_project_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "public"."project_labels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_stack" ADD CONSTRAINT "tech_stack_icon_id_tech_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."tech_icons"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contributions_locale_status_idx" ON "contributions" USING btree ("locale","status");--> statement-breakpoint
CREATE INDEX "education_locale_status_idx" ON "education" USING btree ("locale","status");--> statement-breakpoint
CREATE INDEX "experiences_locale_status_idx" ON "experiences" USING btree ("locale","status");--> statement-breakpoint
CREATE INDEX "projects_locale_status_idx" ON "projects" USING btree ("locale","status");--> statement-breakpoint
CREATE INDEX "projects_order_idx" ON "projects" USING btree ("order");--> statement-breakpoint
CREATE INDEX "testimonials_locale_status_idx" ON "testimonials" USING btree ("locale","status");