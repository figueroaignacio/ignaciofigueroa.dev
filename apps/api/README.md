# api

NestJS content API for ignaciofigueroa.dev. Owns every collection the portfolio
renders and the admin panel edits.

## Layout

- `config/` — environment schema, validated at boot with zod.
- `db/` — global Drizzle provider (`@repo/db`), injected with `@InjectDb()`.
- `auth/` — password login, JWT in an httpOnly cookie, guard for write routes.
- `storage/` — `StoragePort` plus its Supabase Storage adapter.
- `media/`, `tech/`, `taxonomies/`, `projects/`, `experiences/`, `education/`,
  `testimonials/`, `contributions/` — one module per collection, each with a
  public read controller and a guarded `admin/` controller.
- `common/` — zod DTO classes, error filter, cache interceptor, pagination.

Validation lives in `@repo/contracts`, so the schemas the API enforces are the
same ones the frontend types itself from.

## Endpoints

Public reads are cached (`s-maxage=300`) and only return published rows:
`/projects`, `/experiences`, `/education`, `/testimonials`, `/contributions`,
`/tech-stack`, `/tech-icons`, `/project-categories`, `/project-labels`.

Everything under `/admin/*` requires the session cookie and sees drafts too.
OpenAPI is served at `/docs`.

## Running it

```bash
cp .env.example .env
pnpm --filter api dev
```

## Assistant

`assistant/` holds the portfolio chat: Gemini through the Vercel AI SDK, tools
that call the content services directly, and RAG over `portfolio_knowledge`
(pgvector, MiniLM embeddings from HuggingFace). `POST /chat?stream=events`
streams NDJSON tool and text events; `/portfolio/*` serves the chat cards and
the project summary. `pnpm ingest` rebuilds the knowledge base from the
published content.
