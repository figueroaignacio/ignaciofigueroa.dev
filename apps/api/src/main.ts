import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';
import type { Env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<Env, true>);

  app.use(cookieParser());
  app.enableCors({
    origin: config
      .get('FRONTEND_URL', { infer: true })
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    credentials: true,
  });

  const document = cleanupOpenApiDoc(
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('ignaciofigueroa.dev CMS')
        .setDescription('Content API behind the portfolio and its admin panel')
        .setVersion('1.0')
        .addCookieAuth(config.get('COOKIE_NAME', { infer: true }))
        .build(),
    ),
  );
  SwaggerModule.setup('docs', app, document);

  const port = config.get('PORT', { infer: true });
  await app.listen(port);
  new Logger('Bootstrap').log(`API listening on http://localhost:${port} (docs at /docs)`);
}

void bootstrap();
