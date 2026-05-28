import { z } from 'zod';
import { McpTool } from '../types';

export const projectTools: McpTool[] = [
  {
    name: 'get_projects',
    description:
      'Retrieve all projects from Payload CMS, including their titles, subtitles, descriptions, and draft statuses.',
    schema: z.object({
      locale: z.enum(['en', 'es']).optional().describe('The locale to fetch (en/es).'),
    }),
    async execute(args, payload) {
      const projects = await payload.find({
        collection: 'projects',
        locale: args?.locale || 'en',
        draft: true,
        limit: 100,
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(projects.docs, null, 2),
          },
        ],
      };
    },
  },
  {
    name: 'update_project',
    description: 'Update the copywriting details of a project by its document ID.',
    schema: z.object({
      id: z.string().describe('The project document ID.'),
      title: z.string().optional().describe('Updated project title.'),
      subtitle: z.string().optional().describe('Updated project subtitle/tagline.'),
      description: z.string().optional().describe('Updated project short description.'),
      slug: z.string().optional().describe('Updated URL slug (must be unique).'),
      isDraft: z
        .boolean()
        .optional()
        .describe('Whether to save as draft (true) or publish (false). Defaults to false.'),
    }),
    async execute(args, payload) {
      const { id, title, subtitle, description, slug, isDraft } = args;
      const updated = await payload.update({
        collection: 'projects',
        id,
        data: {
          ...(title !== undefined && { title }),
          ...(subtitle !== undefined && { subtitle }),
          ...(description !== undefined && { description }),
          ...(slug !== undefined && { slug }),
        },
        draft: isDraft ?? false,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Successfully updated project "${updated.title}" (ID: ${updated.id})`,
          },
        ],
      };
    },
  },
];
