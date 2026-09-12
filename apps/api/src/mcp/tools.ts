import type { INestApplicationContext } from '@nestjs/common';
import { localeSchema } from '@repo/contracts';
import { z } from 'zod';
import { EducationService } from '../education/education.service';
import { ExperiencesService } from '../experiences/experiences.service';
import { ProjectsService } from '../projects/projects.service';

export interface McpTool<TSchema extends z.ZodRawShape = z.ZodRawShape> {
  name: string;
  description: string;
  schema: TSchema;
  execute: (
    args: Record<string, any>,
    app: INestApplicationContext,
  ) => Promise<{ content: Array<{ type: 'text'; text: string }> }>;
}

const text = (value: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }],
});

const adminList = { page: 1, limit: 100 } as const;

export const mcpTools: McpTool[] = [
  {
    name: 'get_projects',
    description: 'List every project, drafts included, with its copy and relations.',
    schema: { locale: localeSchema.optional().describe('Filter by locale (en/es).') },
    async execute(args, app) {
      const projects = app.get(ProjectsService);
      return text(await projects.findAll({ ...adminList, locale: args.locale }));
    },
  },
  {
    name: 'update_project',
    description: 'Update the copywriting fields of a project by its id.',
    schema: {
      id: z.uuid().describe('Project id.'),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      body: z.string().optional().describe('Markdown body.'),
      slug: z.string().optional(),
      status: z.enum(['draft', 'published']).optional(),
    },
    async execute(args, app) {
      const { id, ...patch } = args;
      const projects = app.get(ProjectsService);
      return text(await projects.update(id, patch));
    },
  },
  {
    name: 'get_experiences',
    description: 'List every work experience, drafts included.',
    schema: { locale: localeSchema.optional() },
    async execute(args, app) {
      const experiences = app.get(ExperiencesService);
      return text(await experiences.findAll({ ...adminList, locale: args.locale }));
    },
  },
  {
    name: 'update_experience',
    description: 'Update the details and responsibilities of an experience.',
    schema: {
      id: z.uuid(),
      title: z.string().optional(),
      company: z.string().optional(),
      location: z.string().optional(),
      tasks: z.array(z.string()).optional(),
      status: z.enum(['draft', 'published']).optional(),
    },
    async execute(args, app) {
      const { id, ...patch } = args;
      const experiences = app.get(ExperiencesService);
      return text(await experiences.update(id, patch));
    },
  },
  {
    name: 'get_education',
    description: 'List every education entry, drafts included.',
    schema: { locale: localeSchema.optional() },
    async execute(args, app) {
      const education = app.get(EducationService);
      return text(await education.findAll({ ...adminList, locale: args.locale }));
    },
  },
  {
    name: 'update_education',
    description: 'Update an education entry by its id.',
    schema: {
      id: z.uuid(),
      title: z.string().optional(),
      institution: z.string().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(['draft', 'published']).optional(),
    },
    async execute(args, app) {
      const { id, ...patch } = args;
      const education = app.get(EducationService);
      return text(await education.update(id, patch));
    },
  },
];
