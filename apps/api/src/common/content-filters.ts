import type { ContentStatus, Locale } from '@repo/contracts';
import { and, eq, type PgColumn, type SQL } from '@repo/db';

export interface LocaleContentColumns {
  locale: PgColumn;
  status: PgColumn;
}

export function contentWhere(
  columns: LocaleContentColumns,
  filters: { locale?: Locale; status?: ContentStatus },
): SQL | undefined {
  const clauses: SQL[] = [];
  if (filters.locale) clauses.push(eq(columns.locale, filters.locale));
  if (filters.status) clauses.push(eq(columns.status, filters.status));
  return clauses.length ? and(...clauses) : undefined;
}
