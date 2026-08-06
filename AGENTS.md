# AGENTS.md

## Commands

```bash
pnpm dev       # Start dev server (http://localhost:3000)
pnpm build     # Production build
pnpm lint       # ESLint
pnpm format     # Prettier write
pnpm payload generate:types  # Regenerate Payload CMS types
pnpm devsafe   # Clean .next and restart dev
```

Note: All node commands require `NODE_OPTIONS=--no-deprecation` (set automatically in scripts).

## Architecture

- **Locale routing**: `[locale]/` route segment — all public pages under `src/app/[locale]/(main)/`
- **Payload admin**: `/admin` via `(payload)` route group
- **Collections**: `src/shared/collections/*.ts` — maps to PostgreSQL tables
- **Shared**: `src/shared/components/ui/` for primitives (Section, Skeleton, TechChip…), `src/shared/components/` for layout chrome (Dock, Footer), `src/shared/lib/` for utilities

### Feature structure (views → containers → widgets → ui)

Each feature under `src/features/<name>/` follows a layered flow:

- **`views/`** — page-level composition. Owns shared page state and arranges containers (wrapped in `<Suspense>` with skeleton fallbacks). A view can have many containers.
- **`containers/`** — async server components that orchestrate data: fetch via `api/`, transform to widget props. A container can feed many widgets.
- **`widgets/`** — receive data from a container and pick the UI by state: `undefined` → skeleton UI, `null`/empty → empty UI (section hidden), data → data UI.
- **`ui/`** — smallest presentational components (lists, cards, skeletons, static sections).
- **`api/`** — data fetchers (Payload local API via `shared/lib/collection-query`, GitHub, external APIs).
- **`actions/`**, **`hooks/`**, **`lib/`** — server actions, client hooks, feature utilities.

Routes in `src/app/` stay thin: metadata/SEO + render the feature's view.

## Tech Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4
- Payload CMS 3.0 + Vercel Postgres adapter
- i18n via next-intl (`src/i18n/`)
- Strict TypeScript (`strict: true` in tsconfig)

## Dev Notes

- Requires `.env` with `POSTGRES_URL`, `PAYLOAD_SECRET`, `GROQ_API_KEY`
- Use `@payload-config` import alias for config file
- Use `@/*` alias for `src/*`
- Migrations in `src/migrations/`

## Git/Workflow

- Husky pre-commit hooks active
- commitlint uses Conventional Commits format
- lint-staged runs ESLint fix + Prettier write on staged files

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
