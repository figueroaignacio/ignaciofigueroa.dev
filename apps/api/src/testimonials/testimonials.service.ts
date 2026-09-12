import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminListQuery,
  CreateTestimonialInput,
  Locale,
  UpdateTestimonialInput,
} from '@repo/contracts';
import { asc, type Database, eq, sql, testimonials } from '@repo/db';
import { contentWhere } from '../common/content-filters';
import { offset, paginate } from '../common/paginate';
import { InjectDb } from '../db/inject-db.decorator';

const ORDER = [asc(testimonials.order), asc(testimonials.name)];

@Injectable()
export class TestimonialsService {
  constructor(@InjectDb() private readonly db: Database) {}

  findPublic(locale?: Locale) {
    return this.db.query.testimonials.findMany({
      where: contentWhere(testimonials, { locale, status: 'published' }),
      orderBy: ORDER,
    });
  }

  async findAll(query: AdminListQuery) {
    const where = contentWhere(testimonials, query);
    const [items, [count]] = await Promise.all([
      this.db.query.testimonials.findMany({
        where,
        orderBy: ORDER,
        limit: query.limit,
        offset: offset(query),
      }),
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(testimonials)
        .where(where),
    ]);
    return paginate(items, count?.count ?? 0, query);
  }

  async findById(id: string) {
    const item = await this.db.query.testimonials.findFirst({ where: eq(testimonials.id, id) });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async create(dto: CreateTestimonialInput) {
    const [created] = await this.db
      .insert(testimonials)
      .values({ ...dto, date: dto.date ?? null, avatar: dto.avatar || null })
      .returning();
    return created;
  }

  async update(id: string, dto: UpdateTestimonialInput) {
    await this.findById(id);
    if (Object.keys(dto).length === 0) return this.findById(id);

    const [updated] = await this.db
      .update(testimonials)
      .set({
        ...dto,
        ...(dto.date !== undefined ? { date: dto.date ?? null } : {}),
        ...(dto.avatar !== undefined ? { avatar: dto.avatar || null } : {}),
      })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    if (!deleted) throw new NotFoundException('Testimonial not found');
    return deleted;
  }
}
