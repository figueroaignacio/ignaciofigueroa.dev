# ignaciofigueroa.dev

Personal site and the CMS behind it, in one monorepo.

| workspace             | what it is                                                        |
| --------------------- | ----------------------------------------------------------------- |
| `apps/web`            | Next.js site (public pages) plus the `/admin` panel                |
| `apps/api`            | NestJS content API, auth, media, GitHub sync and an MCP server     |
| `packages/contracts`  | zod schemas and DTO types shared by both sides                     |
| `packages/db`         | Drizzle schema, migrations, seed and the Payload import script     |
| `packages/typescript-config` | shared tsconfig bases                                      |

Postgres and file storage are Supabase. The site reads the API over HTTP and
caches it in the Next data cache; the panel writes through the same API with a
JWT in an httpOnly cookie.

## Getting started

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp packages/db/.env.example packages/db/.env

pnpm db:migrate   # create the schema
pnpm db:seed      # create the single admin user
pnpm dev          # api on :4000, web on :3000
```

The admin panel lives at `http://localhost:3000/admin`. OpenAPI docs are at
`http://localhost:4000/docs`.

A local Postgres plus a production build of the API is one command away:

```bash
docker compose up --build
```

## Content model

Ten collections: projects, experiences, education, testimonials, contributions,
media, technologies, tech icons, project categories and project labels. Every
editorial collection carries a `locale` (`en` / `es`) and a `status`
(`draft` / `published`); public endpoints only ever return published rows.

Project bodies are markdown, written with Tiptap in the panel and rendered with
react-markdown on the site.

## Migrating from Payload

The old Payload database can be copied over once:

```bash
PAYLOAD_DATABASE_URL="postgres://..." pnpm db:import
```

It maps every collection, converts Lexical rich text to markdown and keeps the
relations. Media rows are imported as `legacy` links; re-upload them from the
panel to move the files into Supabase Storage.
