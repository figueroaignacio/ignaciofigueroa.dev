import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import express, { type Express } from 'express';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module';
import type { Env } from './config/env';

export async function createApp(server: Express = express()): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
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

  return app;
}
