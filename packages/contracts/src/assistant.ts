import { z } from 'zod';

export const CHAT_MESSAGE_MAX_CHARS = 12_000;

export const chatMessageSchema = z.object({
  role: z.string().default(''),
  content: z.string().max(CHAT_MESSAGE_MAX_CHARS).default(''),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(CHAT_MESSAGE_MAX_CHARS),
  history: z.array(chatMessageSchema).max(50).default([]),
  locale: z.string().max(10).default('en'),
});

export const chatStreamQuerySchema = z.object({
  stream: z.enum(['text', 'events']).default('text'),
});

export const summarizeRequestSchema = z.object({
  body: z.string().min(1).max(60_000),
  locale: z.string().max(10).default('en'),
});

export const localeOnlyQuerySchema = z.object({
  locale: z.string().max(10).default('en'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
export type SummarizeRequestInput = z.infer<typeof summarizeRequestSchema>;

export type ChatStreamEvent =
  { type: 'text'; delta: string } | { type: 'tool'; status: 'start' | 'end'; name: string };

export type SuitabilityReport = {
  match_score: number;
  role: string;
  company: string;
  pitch: string;
};
