import type { AdminListQuery, Paginated } from '@repo/contracts';

export function paginate<T>(items: T[], total: number, query: AdminListQuery): Paginated<T> {
  return { items, total, page: query.page, limit: query.limit };
}

export function offset(query: AdminListQuery) {
  return (query.page - 1) * query.limit;
}
