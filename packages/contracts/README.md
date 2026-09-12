# @repo/contracts

The zod schemas and DTO types both sides of the monorepo agree on.

The API turns these schemas into Nest DTOs and validates every request with
them; the web app imports the same types for its fetchers and forms. Changing a
field here breaks the build on whichever side has not caught up, which is the
point.

`toUpdateSchema` builds the PATCH variant of a create schema: it makes every
field optional **and** drops `.default()` wrappers, so an absent field stays
absent instead of resetting the stored value.
