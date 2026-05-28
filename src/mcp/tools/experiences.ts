import { z } from 'zod';
import { McpTool } from '../types';

export const experienceTools: McpTool[] = [
  {
    name: 'get_experiences',
    description:
      'Retrieve all job experiences from Payload CMS, including job titles, company names, locations, and tasks/responsibilities.',
    schema: z.object({
      locale: z.enum(['en', 'es']).optional().describe('The locale to fetch (en/es).'),
    }),
    async execute(args, payload) {
      const experiences = await payload.find({
        collection: 'experience',
        locale: args?.locale || 'en',
        draft: true,
        limit: 100,
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(experiences.docs, null, 2),
          },
        ],
      };
    },
  },
  {
    name: 'update_experience',
    description: 'Update the details and responsibilities of an experience record.',
    schema: z.object({
      id: z.string().describe('The experience document ID.'),
      title: z.string().optional().describe('Updated job title.'),
      company: z.string().optional().describe('Updated company name.'),
      location: z.string().optional().describe('Updated job location.'),
      tasks: z
        .array(
          z.object({
            item: z.string().describe('Task description text.'),
          }),
        )
        .optional()
        .describe('Updated list of tasks/responsibilities.'),
      isDraft: z
        .boolean()
        .optional()
        .describe('Whether to save as draft (true) or publish (false). Defaults to false.'),
    }),
    async execute(args, payload) {
      const { id, title, company, location, tasks, isDraft } = args;
      const updated = await payload.update({
        collection: 'experience',
        id,
        data: {
          ...(title !== undefined && { title }),
          ...(company !== undefined && { company }),
          ...(location !== undefined && { location }),
          ...(tasks !== undefined && { tasks }),
        },
        draft: isDraft ?? false,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Successfully updated experience at "${updated.company}" (ID: ${updated.id})`,
          },
        ],
      };
    },
  },
];
