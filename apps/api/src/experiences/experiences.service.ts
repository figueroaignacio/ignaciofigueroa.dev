import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminListQuery,
  CreateExperienceInput,
  Locale,
  UpdateExperienceInput,
} from '@repo/contracts';
import { asc, type Database, eq, experiences, sql } from '@repo/db';
import { contentWhere } from '../common/content-filters';
import { offset, paginate } from '../common/paginate';
import { InjectDb } from '../db/inject-db.decorator';

const ORDER = [asc(experiences.order), asc(experiences.startDate)];

@Injectable()
export class ExperiencesService {
  constructor(@InjectDb() private readonly db: Database) {}

  findPublic(locale?: Locale) {
    return this.db.query.experiences.findMany({
      where: contentWhere(experiences, { locale, status: 'published' }),
      orderBy: ORDER,
    });
  }

  async findAll(query: AdminListQuery) {
    const where = contentWhere(experiences, query);
    const [items, [count]] = await Promise.all([
      this.db.query.experiences.findMany({
        where,
        orderBy: ORDER,
        limit: query.limit,
        offset: offset(query),
      }),
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(experiences)
        .where(where),
    ]);
    return paginate(items, count?.count ?? 0, query);
  }

  async findById(id: string) {
    const item = await this.db.query.experiences.findFirst({ where: eq(experiences.id, id) });
    if (!item) throw new NotFoundException('Experience not found');
    return item;
  }

  async create(dto: CreateExperienceInput) {
    const [created] = await this.db
      .insert(experiences)
      .values({ ...dto, endDate: dto.endDate ?? null, link: dto.link || null })
      .returning();
    return created;
  }

  async update(id: string, dto: UpdateExperienceInput) {
    await this.findById(id);
    if (Object.keys(dto).length === 0) return this.findById(id);

    const [updated] = await this.db
      .update(experiences)
      .set({
        ...dto,
        ...(dto.endDate !== undefined ? { endDate: dto.endDate ?? null } : {}),
        ...(dto.link !== undefined ? { link: dto.link || null } : {}),
      })
      .where(eq(experiences.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db.delete(experiences).where(eq(experiences.id, id)).returning();
    if (!deleted) throw new NotFoundException('Experience not found');
    return deleted;
  }
}
