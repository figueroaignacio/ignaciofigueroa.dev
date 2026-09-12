import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Env } from '../config/env';
import type { StoragePort, UploadedObject } from './storage.port';

@Injectable()
export class SupabaseStorageService implements StoragePort {
  private client: SupabaseClient | null = null;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService<Env, true>) {
    this.bucket = config.get('SUPABASE_STORAGE_BUCKET', { infer: true });
  }

  async upload(path: string, body: Buffer, contentType: string): Promise<UploadedObject> {
    const storage = this.getClient().storage.from(this.bucket);
    const { error } = await storage.upload(path, body, { contentType, upsert: false });
    if (error) throw new ServiceUnavailableException(`Storage upload failed: ${error.message}`);
    const { data } = storage.getPublicUrl(path);
    return { bucket: this.bucket, path, url: data.publicUrl };
  }

  async remove(path: string): Promise<void> {
    const { error } = await this.getClient().storage.from(this.bucket).remove([path]);
    if (error) throw new ServiceUnavailableException(`Storage delete failed: ${error.message}`);
  }

  private getClient(): SupabaseClient {
    if (this.client) return this.client;
    const url = this.config.get('SUPABASE_URL', { infer: true });
    const key = this.config.get('SUPABASE_SERVICE_ROLE_KEY', { infer: true });
    if (!url || !key) {
      throw new ServiceUnavailableException('Supabase storage is not configured');
    }
    this.client = createClient(url, key, { auth: { persistSession: false } });
    return this.client;
  }
}
