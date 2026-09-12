# @repo/db

Drizzle schema, client and migrations for the CMS.

```bash
pnpm db:generate   # write a migration from the schema
pnpm db:migrate    # apply pending migrations
pnpm db:seed       # create or update the single admin user
pnpm db:import     # one-off copy from the old Payload database
pnpm db:studio     # browse the data
```

`DATABASE_URL` points at Supabase's transaction pooler (port 6543). The client
uses `postgres.js` with prepared statements disabled, which is what the pooler
requires.

Naming is snake_case in the database and camelCase in TypeScript; Drizzle's
`casing: 'snake_case'` does the mapping, so columns are declared without an
explicit name.
