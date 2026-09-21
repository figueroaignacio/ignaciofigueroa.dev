import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ZodValidationPipe } from 'nestjs-zod';
import { AssistantModule } from './assistant/assistant.module';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { validateEnv } from './config/env';
import { ContributionsModule } from './contributions/contributions.module';
import { DbModule } from './db/db.module';
import { EducationModule } from './education/education.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { GithubModule } from './github/github.module';
import { HealthController } from './health/health.controller';
import { MediaModule } from './media/media.module';
import { ProjectsModule } from './projects/projects.module';
import { StorageModule } from './storage/storage.module';
import { TaxonomiesModule } from './taxonomies/taxonomies.module';
import { TechModule } from './tech/tech.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    DbModule,
    StorageModule,
    AuthModule,
    GithubModule,
    MediaModule,
    TechModule,
    TaxonomiesModule,
    ProjectsModule,
    ExperiencesModule,
    EducationModule,
    TestimonialsModule,
    ContributionsModule,
    AssistantModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
