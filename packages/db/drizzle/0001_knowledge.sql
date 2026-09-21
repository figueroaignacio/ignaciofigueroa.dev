CREATE TABLE "portfolio_knowledge" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "portfolio_knowledge_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" text NOT NULL,
	"category" text NOT NULL,
	"embedding" vector(384),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "portfolio_knowledge_embedding_idx" ON "portfolio_knowledge" USING hnsw ("embedding" vector_cosine_ops);