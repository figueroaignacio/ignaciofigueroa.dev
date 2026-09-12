import type { ProjectDto } from '@repo/contracts';

type Row = Record<string, any>;

export function toProjectDto(row: Row): ProjectDto {
  return {
    id: row.id,
    locale: row.locale,
    status: row.status,
    title: row.title,
    subtitle: row.subtitle,
    slug: row.slug,
    description: row.description,
    body: row.body,
    icon: row.icon ?? null,
    imageId: row.imageId ?? null,
    image: row.image ?? null,
    videoUrl: row.videoUrl ?? null,
    repository: row.repository ?? null,
    demo: row.demo ?? null,
    isCommercial: row.isCommercial,
    order: row.order,
    publishedAt: row.publishedAt ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    technologies: (row.technologies ?? []).map((link: Row) => link.tech).filter(Boolean),
    labels: (row.labels ?? []).map((link: Row) => link.label).filter(Boolean),
    categories: (row.categories ?? []).map((link: Row) => link.category).filter(Boolean),
  };
}
