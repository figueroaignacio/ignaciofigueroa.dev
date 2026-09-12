import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateTechIconInput,
  CreateTechStackInput,
  UpdateTechIconInput,
  UpdateTechStackInput,
} from '@repo/contracts';
import { asc, type Database, eq, techIcons, techStack } from '@repo/db';
import { InjectDb } from '../db/inject-db.decorator';

@Injectable()
export class TechService {
  constructor(@InjectDb() private readonly db: Database) {}

  findIcons() {
    return this.db.query.techIcons.findMany({ orderBy: asc(techIcons.name) });
  }

  findStack() {
    return this.db.query.techStack.findMany({
      orderBy: asc(techStack.name),
      with: { icon: true },
    });
  }

  async createIcon(dto: CreateTechIconInput) {
    await this.assertIconNameFree(dto.name);
    const [created] = await this.db.insert(techIcons).values(dto).returning();
    return created;
  }

  async updateIcon(id: string, dto: UpdateTechIconInput) {
    const existing = await this.db.query.techIcons.findFirst({ where: eq(techIcons.id, id) });
    if (!existing) throw new NotFoundException('Tech icon not found');
    if (dto.name && dto.name !== existing.name) await this.assertIconNameFree(dto.name);

    const [updated] = await this.db
      .update(techIcons)
      .set(dto)
      .where(eq(techIcons.id, id))
      .returning();
    return updated;
  }

  async removeIcon(id: string) {
    const [deleted] = await this.db.delete(techIcons).where(eq(techIcons.id, id)).returning();
    if (!deleted) throw new NotFoundException('Tech icon not found');
    return deleted;
  }

  async createTech(dto: CreateTechStackInput) {
    await this.assertTechNameFree(dto.name);
    const [created] = await this.db
      .insert(techStack)
      .values({ name: dto.name, iconId: dto.iconId ?? null })
      .returning();
    return created;
  }

  async updateTech(id: string, dto: UpdateTechStackInput) {
    const existing = await this.db.query.techStack.findFirst({ where: eq(techStack.id, id) });
    if (!existing) throw new NotFoundException('Technology not found');
    if (dto.name && dto.name !== existing.name) await this.assertTechNameFree(dto.name);

    const [updated] = await this.db
      .update(techStack)
      .set({
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.iconId !== undefined ? { iconId: dto.iconId } : {}),
      })
      .where(eq(techStack.id, id))
      .returning();
    return updated;
  }

  async removeTech(id: string) {
    const [deleted] = await this.db.delete(techStack).where(eq(techStack.id, id)).returning();
    if (!deleted) throw new NotFoundException('Technology not found');
    return deleted;
  }

  private async assertIconNameFree(name: string) {
    const clash = await this.db.query.techIcons.findFirst({ where: eq(techIcons.name, name) });
    if (clash) throw new ConflictException(`Tech icon "${name}" already exists`);
  }

  private async assertTechNameFree(name: string) {
    const clash = await this.db.query.techStack.findFirst({ where: eq(techStack.name, name) });
    if (clash) throw new ConflictException(`Technology "${name}" already exists`);
  }
}
