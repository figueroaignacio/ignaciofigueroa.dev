import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { KnowledgeService } from '../assistant/knowledge.service';
import { EducationService } from '../education/education.service';
import { ExperiencesService } from '../experiences/experiences.service';
import { ProjectsService } from '../projects/projects.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  const chunks: Array<{ content: string; category: string }> = [];

  for (const locale of ['en', 'es'] as const) {
    for (const project of await app.get(ProjectsService).findPublic({ locale })) {
      const content = project.description || project.body;
      if (content.trim()) chunks.push({ content, category: 'projects' });
    }
    for (const item of await app.get(ExperiencesService).findPublic(locale)) {
      chunks.push({
        content: `${item.title} at ${item.company}. Location: ${item.location ?? ''}. Tasks: ${item.tasks.join(' ')}. Technologies: ${item.technologies.join(', ')}.`,
        category: 'experience',
      });
    }
    for (const item of await app.get(EducationService).findPublic(locale)) {
      const content = item.description ?? `${item.title} at ${item.institution}`;
      if (content.trim()) chunks.push({ content, category: 'education' });
    }
  }

  const stored = await app.get(KnowledgeService).replaceAll(chunks);
  console.log(`Ingestion complete. ${stored} chunks stored.`);
  await app.close();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
