import { Module } from '@nestjs/common';
import { ExperiencesModule } from '../experiences/experiences.module';
import { ProjectsModule } from '../projects/projects.module';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { EmbeddingsService } from './embeddings.service';
import { KnowledgeService } from './knowledge.service';

@Module({
  imports: [ProjectsModule, ExperiencesModule],
  controllers: [AssistantController],
  providers: [AssistantService, EmbeddingsService, KnowledgeService],
  exports: [KnowledgeService],
})
export class AssistantModule {}
