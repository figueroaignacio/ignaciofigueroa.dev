import { Global, Module } from '@nestjs/common';
import { STORAGE } from './storage.port';
import { SupabaseStorageService } from './supabase-storage.service';

@Global()
@Module({
  providers: [{ provide: STORAGE, useClass: SupabaseStorageService }],
  exports: [STORAGE],
})
export class StorageModule {}
