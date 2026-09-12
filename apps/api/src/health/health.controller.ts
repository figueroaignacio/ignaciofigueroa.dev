import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { type Database, sql } from '@repo/db';
import { InjectDb } from '../db/inject-db.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@InjectDb() private readonly db: Database) {}

  @Get()
  async check() {
    await this.db.execute(sql`select 1`);
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
