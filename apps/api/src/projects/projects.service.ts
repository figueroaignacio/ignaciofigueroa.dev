import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminListQuery,
  CreateProjectInput,
  ListProjectsQuery,
  Locale,
  ProjectDto,
  UpdateProjectInput,
} from '@repo/contracts';
import {
  and,
  asc,
  type Database,
  eq,
  inArray,
  projectCategories,
  projects,
  projectTechnologies,
  projectToCategories,
  projectToLabels,
  type SQL,
  sql,
} from '@repo/db';
import { offset, paginate } from '../common/paginate';
import { slugify } from '../common/slugify';
import { InjectDb } from '../db/inject-db.decorator';
import { toProjectDto } from './projects.mapper';

const WITH_RELATIONS = {
  image: true,
  technologies: { with: { tech: { with: { icon: true } } } },
  labels: { with: { label: true } },
  categories: { with: { category: true } },
} as const;

@Injectable()
export class ProjectsService {
  constructor(@InjectDb() private readonly db: Database) {}

  async findPublic(query: ListProjectsQuery): Promise<ProjectDto[]> {
    const clauses: SQL[] = [eq(projects.status, 'published')];
    if (query.locale) clauses.push(eq(projects.locale, query.locale));
    if (query.commercial !== undefined) clauses.push(eq(projects.isCommercial, query.commercial));

    if (query.category) {
      const category = await this.db.query.projectCategories.findFirst({
        where: eq(projectCategories.slug, query.category),
      });
      if (!category) return [];
      const links = await this.db
        .select({ projectId: projectToCategories.projectId })
        .from(projectToCategories)
        .where(eq(projectToCategories.categoryId, category.id));
      if (links.length === 0) return [];
      clauses.push(
        inArray(
          projects.id,
          links.map((link) => link.projectId),
        ),
      );
    }

    const rows = await this.db.query.projects.findMany({
      where: and(...clauses),
      orderBy: [asc(projects.order), asc(projects.title)],
      with: WITH_RELATIONS,
    });
    return rows.map(toProjectDto);
  }

  async findPublicBySlug(slug: string): Promise<ProjectDto> {
    const row = await this.db.query.projects.findFirst({
      where: and(eq(projects.slug, slug), eq(projects.status, 'published')),
      with: WITH_RELATIONS,
    });
    if (!row) throw new NotFoundException('Project not found');
    return toProjectDto(row);
  }

  async findAll(query: AdminListQuery) {
    const clauses: SQL[] = [];
    if (query.locale) clauses.push(eq(projects.locale, query.locale));
    if (query.status) clauses.push(eq(projects.status, query.status));
    const where = clauses.length ? and(...clauses) : undefined;

    const [rows, [count]] = await Promise.all([
      this.db.query.projects.findMany({
        where,
        orderBy: [asc(projects.order), asc(projects.title)],
        limit: query.limit,
        offset: offset(query),
        with: WITH_RELATIONS,
      }),
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(projects)
        .where(where),
    ]);

    return paginate(rows.map(toProjectDto), count?.count ?? 0, query);
  }

  async findById(id: string): Promise<ProjectDto> {
    const row = await this.db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: WITH_RELATIONS,
    });
    if (!row) throw new NotFoundException('Project not found');
    return toProjectDto(row);
  }

  async slugsByLocale(locale: Locale): Promise<string[]> {
    const rows = await this.db
      .select({ slug: projects.slug })
      .from(projects)
      .where(and(eq(projects.locale, locale), eq(projects.status, 'published')));
    return rows.map((row) => row.slug);
  }

  async create(dto: CreateProjectInput): Promise<ProjectDto> {
    const slug = dto.slug ?? slugify(dto.title);
    await this.assertSlugFree(slug);

    const [created] = await this.db
      .insert(projects)
      .values({
        locale: dto.locale,
        status: dto.status,
        title: dto.title,
        subtitle: dto.subtitle,
        slug,
        description: dto.description,
        body: dto.body,
        icon: dto.icon ?? null,
        imageId: dto.imageId ?? null,
        videoUrl: dto.videoUrl || null,
        repository: dto.repository || null,
        demo: dto.demo || null,
        isCommercial: dto.isCommercial,
        order: dto.order,
        publishedAt: dto.status === 'published' ? new Date() : null,
      })
      .returning({ id: projects.id });

    await this.syncRelations(created!.id, dto);
    return this.findById(created!.id);
  }

  async update(id: string, dto: UpdateProjectInput): Promise<ProjectDto> {
    const existing = await this.db.query.projects.findFirst({ where: eq(projects.id, id) });
    if (!existing) throw new NotFoundException('Project not found');
    if (dto.slug && dto.slug !== existing.slug) await this.assertSlugFree(dto.slug);

    const becomesPublished = dto.status === 'published' && existing.status !== 'published';
    const becomesDraft = dto.status === 'draft' && existing.status !== 'draft';

    const values = {
      ...(dto.locale !== undefined ? { locale: dto.locale } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.subtitle !== undefined ? { subtitle: dto.subtitle } : {}),
      ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.body !== undefined ? { body: dto.body } : {}),
      ...(dto.icon !== undefined ? { icon: dto.icon ?? null } : {}),
      ...(dto.imageId !== undefined ? { imageId: dto.imageId ?? null } : {}),
      ...(dto.videoUrl !== undefined ? { videoUrl: dto.videoUrl || null } : {}),
      ...(dto.repository !== undefined ? { repository: dto.repository || null } : {}),
      ...(dto.demo !== undefined ? { demo: dto.demo || null } : {}),
      ...(dto.isCommercial !== undefined ? { isCommercial: dto.isCommercial } : {}),
      ...(dto.order !== undefined ? { order: dto.order } : {}),
      ...(becomesPublished ? { publishedAt: new Date() } : {}),
      ...(becomesDraft ? { publishedAt: null } : {}),
    };

    // A patch that only moves relations leaves no column to write, and Drizzle
    // rejects an empty `set`, so the timestamp carries the change instead.
    await this.db
      .update(projects)
      .set(Object.keys(values).length ? values : { updatedAt: new Date() })
      .where(eq(projects.id, id));

    await this.syncRelations(id, dto);
    return this.findById(id);
  }

  async remove(id: string): Promise<ProjectDto> {
    const project = await this.findById(id);
    await this.db.delete(projects).where(eq(projects.id, id));
    return project;
  }

  private async syncRelations(projectId: string, dto: UpdateProjectInput) {
    if (dto.technologyIds) {
      await this.db.delete(projectTechnologies).where(eq(projectTechnologies.projectId, projectId));
      if (dto.technologyIds.length) {
        await this.db
          .insert(projectTechnologies)
          .values(dto.technologyIds.map((techId, position) => ({ projectId, techId, position })));
      }
    }
    if (dto.labelIds) {
      await this.db.delete(projectToLabels).where(eq(projectToLabels.projectId, projectId));
      if (dto.labelIds.length) {
        await this.db
          .insert(projectToLabels)
          .values(dto.labelIds.map((labelId) => ({ projectId, labelId })));
      }
    }
    if (dto.categoryIds) {
      await this.db.delete(projectToCategories).where(eq(projectToCategories.projectId, projectId));
      if (dto.categoryIds.length) {
        await this.db
          .insert(projectToCategories)
          .values(dto.categoryIds.map((categoryId) => ({ projectId, categoryId })));
      }
    }
  }

  private async assertSlugFree(slug: string) {
    const clash = await this.db.query.projects.findFirst({ where: eq(projects.slug, slug) });
    if (clash) throw new ConflictException(`Project slug "${slug}" already exists`);
  }
}
