import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from './config/env';
import { createApp } from './create-app';

async function bootstrap() {
  const app = await createApp();
  const port = app.get(ConfigService<Env, true>).get('PORT', { infer: true });
  await app.listen(port);
  new Logger('Bootstrap').log(`API listening on http://localhost:${port} (docs at /docs)`);
}

void bootstrap();
