import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MEDIA_MAX_BYTES, MEDIA_MIME_TYPES, type UpdateMediaInput } from '@repo/contracts';
import { type Database, desc, eq, media } from '@repo/db';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import sharp from 'sharp';
import { slugify } from '../common/slugify';
import { InjectDb } from '../db/inject-db.decorator';
import { STORAGE, type StoragePort } from '../storage/storage.port';

export interface IncomingFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class MediaService {
  constructor(
    @InjectDb() private readonly db: Database,
    @Inject(STORAGE) private readonly storage: StoragePort,
  ) {}

  findAll() {
    return this.db.query.media.findMany({ orderBy: desc(media.createdAt) });
  }

  async findById(id: string) {
    const item = await this.db.query.media.findFirst({ where: eq(media.id, id) });
    if (!item) throw new NotFoundException('Media not found');
    return item;
  }

  async upload(file: IncomingFile, alt = '') {
    if (!(MEDIA_MIME_TYPES as readonly string[]).includes(file.mimetype)) {
      throw new BadRequestException(`Unsupported file type ${file.mimetype}`);
    }
    if (file.size > MEDIA_MAX_BYTES) {
      throw new BadRequestException('File is larger than 8MB');
    }

    const dimensions = await this.readDimensions(file);
    const ext = extname(file.originalname).toLowerCase();
    const base = slugify(file.originalname.replace(ext, '')) || 'file';
    const path = `${new Date().getFullYear()}/${base}-${randomUUID().slice(0, 8)}${ext}`;

    const uploaded = await this.storage.upload(path, file.buffer, file.mimetype);

    const [saved] = await this.db
      .insert(media)
      .values({
        bucket: uploaded.bucket,
        path: uploaded.path,
        url: uploaded.url,
        alt,
        mimeType: file.mimetype,
        size: file.size,
        width: dimensions.width,
        height: dimensions.height,
      })
      .returning();
    return saved;
  }

  async update(id: string, dto: UpdateMediaInput) {
    const [updated] = await this.db
      .update(media)
      .set({ alt: dto.alt })
      .where(eq(media.id, id))
      .returning();
    if (!updated) throw new NotFoundException('Media not found');
    return updated;
  }

  async remove(id: string) {
    const item = await this.findById(id);
    if (item.bucket !== 'legacy') await this.storage.remove(item.path);
    await this.db.delete(media).where(eq(media.id, id));
    return item;
  }

  private async readDimensions(file: IncomingFile) {
    if (file.mimetype === 'image/svg+xml') return { width: null, height: null };
    try {
      const meta = await sharp(file.buffer).metadata();
      return { width: meta.width ?? null, height: meta.height ?? null };
    } catch {
      return { width: null, height: null };
    }
  }
}
