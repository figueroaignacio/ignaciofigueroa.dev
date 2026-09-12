import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateProjectCategoryInput,
  CreateProjectLabelInput,
  UpdateProjectCategoryInput,
  UpdateProjectLabelInput,
} from '@repo/contracts';
import { asc, type Database, eq, projectCategories, projectLabels } from '@repo/db';
import { slugify } from '../common/slugify';
import { InjectDb } from '../db/inject-db.decorator';

@Injectable()
export class TaxonomiesService {
  constructor(@InjectDb() private readonly db: Database) {}

  findCategories() {
    return this.db.query.projectCategories.findMany({ orderBy: asc(projectCategories.label) });
  }

  findLabels() {
    return this.db.query.projectLabels.findMany({ orderBy: asc(projectLabels.label) });
  }

  async createCategory(dto: CreateProjectCategoryInput) {
    const slug = dto.slug ?? slugify(dto.label);
    await this.assertCategorySlugFree(slug);
    const [created] = await this.db
      .insert(projectCategories)
      .values({ label: dto.label, slug })
      .returning();
    return created;
  }

  async updateCategory(id: string, dto: UpdateProjectCategoryInput) {
    const existing = await this.db.query.projectCategories.findFirst({
      where: eq(projectCategories.id, id),
    });
    if (!existing) throw new NotFoundException('Category not found');
    if (dto.slug && dto.slug !== existing.slug) await this.assertCategorySlugFree(dto.slug);

    const [updated] = await this.db
      .update(projectCategories)
      .set({
        ...(dto.label !== undefined ? { label: dto.label } : {}),
        ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
      })
      .where(eq(projectCategories.id, id))
      .returning();
    return updated;
  }

  async removeCategory(id: string) {
    const [deleted] = await this.db
      .delete(projectCategories)
      .where(eq(projectCategories.id, id))
      .returning();
    if (!deleted) throw new NotFoundException('Category not found');
    return deleted;
  }

  async createLabel(dto: CreateProjectLabelInput) {
    await this.assertLabelFree(dto.label);
    const [created] = await this.db.insert(projectLabels).values({ label: dto.label }).returning();
    return created;
  }

  async updateLabel(id: string, dto: UpdateProjectLabelInput) {
    const existing = await this.db.query.projectLabels.findFirst({
      where: eq(projectLabels.id, id),
    });
    if (!existing) throw new NotFoundException('Label not found');
    if (dto.label && dto.label !== existing.label) await this.assertLabelFree(dto.label);

    const [updated] = await this.db
      .update(projectLabels)
      .set({ ...(dto.label !== undefined ? { label: dto.label } : {}) })
      .where(eq(projectLabels.id, id))
      .returning();
    return updated;
  }

  async removeLabel(id: string) {
    const [deleted] = await this.db
      .delete(projectLabels)
      .where(eq(projectLabels.id, id))
      .returning();
    if (!deleted) throw new NotFoundException('Label not found');
    return deleted;
  }

  private async assertCategorySlugFree(slug: string) {
    const clash = await this.db.query.projectCategories.findFirst({
      where: eq(projectCategories.slug, slug),
    });
    if (clash) throw new ConflictException(`Category slug "${slug}" already exists`);
  }

  private async assertLabelFree(label: string) {
    const clash = await this.db.query.projectLabels.findFirst({
      where: eq(projectLabels.label, label),
    });
    if (clash) throw new ConflictException(`Label "${label}" already exists`);
  }
}
