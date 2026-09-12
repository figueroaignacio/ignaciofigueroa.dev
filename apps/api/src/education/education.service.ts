import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminListQuery,
  CreateEducationInput,
  Locale,
  UpdateEducationInput,
} from '@repo/contracts';
import { asc, type Database, education, eq, sql } from '@repo/db';
import { contentWhere } from '../common/content-filters';
import { offset, paginate } from '../common/paginate';
import { InjectDb } from '../db/inject-db.decorator';

const ORDER = [asc(education.order), asc(education.startDate)];

@Injectable()
export class EducationService {
  constructor(@InjectDb() private readonly db: Database) {}

  findPublic(locale?: Locale) {
    return this.db.query.education.findMany({
      where: contentWhere(education, { locale, status: 'published' }),
      orderBy: ORDER,
    });
  }

  async findAll(query: AdminListQuery) {
    const where = contentWhere(education, query);
    const [items, [count]] = await Promise.all([
      this.db.query.education.findMany({
        where,
        orderBy: ORDER,
        limit: query.limit,
        offset: offset(query),
      }),
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(education)
        .where(where),
    ]);
    return paginate(items, count?.count ?? 0, query);
  }

  async findById(id: string) {
    const item = await this.db.query.education.findFirst({ where: eq(education.id, id) });
    if (!item) throw new NotFoundException('Education entry not found');
    return item;
  }

  async create(dto: CreateEducationInput) {
    const [created] = await this.db
      .insert(education)
      .values({
        ...dto,
        endDate: dto.endDate ?? null,
        certificateUrl: dto.certificateUrl || null,
      })
      .returning();
    return created;
  }

  async update(id: string, dto: UpdateEducationInput) {
    await this.findById(id);
    if (Object.keys(dto).length === 0) return this.findById(id);

    const [updated] = await this.db
      .update(education)
      .set({
        ...dto,
        ...(dto.endDate !== undefined ? { endDate: dto.endDate ?? null } : {}),
        ...(dto.certificateUrl !== undefined ? { certificateUrl: dto.certificateUrl || null } : {}),
      })
      .where(eq(education.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db.delete(education).where(eq(education.id, id)).returning();
    if (!deleted) throw new NotFoundException('Education entry not found');
    return deleted;
  }
}
