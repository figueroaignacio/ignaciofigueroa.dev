# AGENTS.md

## Commands

```bash
pnpm dev            # from the repo root: api + web together
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web check-types
```

`pnpm lint` currently fails repo-wide: typescript-eslint supports `typescript <6.1.0`
and this repo compiles with TypeScript 7. Use `check-types` plus `prettier --write`
and commit with `--no-verify` until the plugin catches up.

## Architecture

- **Locale routing**: `[locale]/` segment, public pages under `src/app/[locale]/(main)/`.
- **Admin panel**: `src/app/admin/`, outside the locale segment because it is
  English only. `(panel)/` requires a session; `login/` does not.
- **Data**: the site never talks to the database. `shared/lib/api-server.ts`
  exposes `apiPublic` (no cookies, cached, safe during static generation) and
  `apiAdmin` (forwards the session cookie, never cached).
- **Types**: `@repo/contracts` is the single source of truth. `shared/lib/content-types.ts`
  re-exports the DTOs under the names the UI already used.

### Feature structure (views → containers → widgets → ui)

- **`views/`** — page-level composition, arranges containers in `<Suspense>`.
- **`containers/`** — async server components: fetch via `api/`, shape widget props.
- **`widgets/`** — pick the UI by state: `undefined` → skeleton, `null`/empty → hidden, data → UI.
- **`ui/`** — presentational components.
- **`api/`** — data fetchers.

The `admin` feature follows the same idea with `api/` (server and client),
`ui/` (one folder per collection) and `lib/` (form hooks).

Routes in `src/app/` stay thin: metadata/SEO plus the feature's view.

## Tech Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4
- next-intl for the public site, Tiptap for the editor
- Strict TypeScript

## Dev Notes

- `.env.local` needs `NEXT_PUBLIC_API_URL` and `AUTH_COOKIE_NAME`.
- After an edit, the panel calls `revalidateContent(tag)` so public pages drop
  the cached read instead of waiting out the five minute window.
- Use `@/*` for `src/*`.

## Git/Workflow

- commitlint uses Conventional Commits, lowercase subject.
- Husky runs prettier on staged files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
