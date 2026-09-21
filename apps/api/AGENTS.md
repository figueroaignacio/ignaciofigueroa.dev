# AGENTS.md

## Commands

```bash
pnpm --filter api dev        # watch mode on :4000
pnpm --filter api build
pnpm --filter api test
pnpm --filter api check-types
pnpm --filter api mcp        # MCP server over stdio (needs a build first)
pnpm --filter api ingest     # rebuild the assistant's RAG table from published content
```

## Architecture

One module per collection, each with a public read controller and a guarded
`admin/` controller. Services own the database access through the injected
Drizzle client; there is no repository layer because Drizzle already is one.

- `config/env.ts` validates the environment with zod at boot; a missing or short
  `JWT_SECRET` fails the process instead of the first request.
- `common/dto.ts` turns the shared zod schemas into Nest DTO classes. Update
  schemas come from `toUpdateSchema`, which strips `.default()` so a PATCH only
  writes the fields it actually sends.
- `storage/` defines `StoragePort` and its Supabase adapter, so the bucket can be
  swapped without touching the media module.
- `github/` syncs pull requests for contributions; a failed call never blocks a save.
- `mcp/` reuses the same services through a standalone Nest context.
- `assistant/` is the chat: Gemini via the Vercel AI SDK, tools over the content services,
  RAG on `portfolio_knowledge`. Env: `GEMINI_API_KEY`, `GEMINI_MODEL`, `HF_TOKEN`.

## Conventions

- Public endpoints return published rows only and set a `s-maxage=300` cache header.
- Write endpoints require the session cookie (`JwtAuthGuard`).
- Errors go through one filter, so every failure has the same JSON shape.
- Drizzle rejects an empty `set`, so partial updates that only move relations
  write the timestamp instead.
