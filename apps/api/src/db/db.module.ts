import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb, type Database } from '@repo/db';
import type { Env } from '../config/env';

export const DATABASE = Symbol('DATABASE');

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): Database =>
        createDb(config.get('DATABASE_URL', { infer: true })),
    },
  ],
  exports: [DATABASE],
})
export class DbModule {}
