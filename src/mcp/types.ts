import { z } from 'zod';
import { Payload } from 'payload';

export interface McpTool<T extends z.ZodObject<any> = any> {
  name: string;
  description: string;
  schema: T;
  execute: (
    args: z.infer<T>,
    payload: Payload,
  ) => Promise<{
    content: Array<{
      type: 'text';
      text: string;
    }>;
  }>;
}
