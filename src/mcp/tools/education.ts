import { z } from 'zod';
import { McpTool } from '../types';

export const educationTools: McpTool[] = [
  {
    name: 'get_education',
    description:
      'Retrieve all education entries from Payload CMS, including degree titles, institutions, descriptions, and dates.',
    schema: z.object({
      locale: z.enum(['en', 'es']).optional().describe('The locale to fetch (en/es).'),
    }),
    async execute(args, payload) {
      const entries = await payload.find({
        collection: 'education',
        draft: true,
        limit: 100,
        where: args?.locale ? { locale: { equals: args.locale } } : {},
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(entries.docs, null, 2),
          },
        ],
      };
    },
  },
  {
    name: 'update_education',
    description: 'Update the details of an education entry by its document ID.',
    schema: z.object({
      id: z.string().describe('The education document ID.'),
      title: z.string().optional().describe('Updated degree or certification title.'),
      institution: z.string().optional().describe('Updated institution name.'),
      location: z.string().optional().describe('Updated location.'),
      description: z.string().optional().describe('Updated description.'),
      isDraft: z
        .boolean()
        .optional()
        .describe('Whether to save as draft (true) or publish (false). Defaults to false.'),
    }),
    async execute(args, payload) {
      const { id, title, institution, location, description, isDraft } = args;
      const updated = await payload.update({
        collection: 'education',
        id,
        data: {
          ...(title !== undefined && { title }),
          ...(institution !== undefined && { institution }),
          ...(location !== undefined && { location }),
          ...(description !== undefined && { description }),
        },
        draft: isDraft ?? false,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Successfully updated education entry "${updated.title}" at ${updated.institution} (ID: ${updated.id})`,
          },
        ],
      };
    },
  },
];
