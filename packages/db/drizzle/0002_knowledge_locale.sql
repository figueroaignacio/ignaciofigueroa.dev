ALTER TABLE "portfolio_knowledge" ADD COLUMN "locale" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
CREATE INDEX "portfolio_knowledge_locale_idx" ON "portfolio_knowledge" USING btree ("locale");