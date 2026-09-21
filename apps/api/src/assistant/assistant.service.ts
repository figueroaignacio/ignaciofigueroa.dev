import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ChatRequestInput, ChatStreamEvent, SuitabilityReport } from '@repo/contracts';
import type { LanguageModel, ModelMessage } from 'ai';
import { z } from 'zod';
import type { Env } from '../config/env';
import { ExperiencesService } from '../experiences/experiences.service';
import { ProjectsService } from '../projects/projects.service';
import { KnowledgeService } from './knowledge.service';
import { ANALYSIS_SYSTEM_PROMPT, CHAT_SYSTEM_PROMPT, SUMMARIZE_SYSTEM_PROMPT } from './prompts';

const HISTORY_LIMIT = 20;

type AiSdk = typeof import('ai');
type GoogleSdk = typeof import('@ai-sdk/google');

const suitabilitySchema = z.object({
  match_score: z.number().int().min(0).max(100),
  role: z.string(),
  company: z.string(),
  pitch: z.string(),
});

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private sdk?: Promise<{ ai: AiSdk; google: GoogleSdk }>;

  constructor(
    private readonly config: ConfigService<Env, true>,
    private readonly knowledge: KnowledgeService,
    private readonly projects: ProjectsService,
    private readonly experiences: ExperiencesService,
  ) {}

  private loadSdk() {
    this.sdk ??= Promise.all([import('ai'), import('@ai-sdk/google')]).then(([ai, google]) => ({
      ai,
      google,
    }));
    return this.sdk;
  }

  private async model(): Promise<{ ai: AiSdk; model: LanguageModel }> {
    const apiKey = this.config.get('GEMINI_API_KEY', { infer: true });
    if (!apiKey) throw new ServiceUnavailableException('GEMINI_API_KEY is not configured');
    const { ai, google } = await this.loadSdk();
    const provider = google.createGoogleGenerativeAI({ apiKey });
    return { ai, model: provider(this.config.get('GEMINI_MODEL', { infer: true })) };
  }

  publicProjects(locale: string) {
    return this.projects.findPublic({ locale: locale === 'es' ? 'es' : 'en' });
  }

  publicExperience(locale: string) {
    return this.experiences.findPublic(locale === 'es' ? 'es' : 'en');
  }

  private tools(tool: AiSdk['tool']) {
    const toolLocale = z.string().default('en').describe("The language locale, 'en' or 'es'.");
    return {
      get_projects: tool({
        description:
          "Fetch a list of my projects, including links, descriptions, and technologies used. Use this to provide information about the projects I've built.",
        inputSchema: z.object({ locale: toolLocale }),
        execute: async ({ locale }) => JSON.stringify(await this.projectsForModel(locale)),
      }),
      get_experience: tool({
        description:
          'Fetch a list of my work experiences, including companies, roles, tasks, and technologies. Use this to provide information about my work history.',
        inputSchema: z.object({ locale: toolLocale }),
        execute: async ({ locale }) => JSON.stringify(await this.experienceForModel(locale)),
      }),
      send_contact_email: tool({
        description:
          'Trigger the sending of a contact email with the name, email, and message body. Call this tool when you have collected all three pieces of information from the user and they want to send the message.',
        inputSchema: z.object({
          name: z.string().describe('The name of the sender.'),
          email: z.string().describe('The email address of the sender.'),
          message: z.string().describe('The content of the message.'),
        }),
        execute: async (payload) => `[SEND_EMAIL_TRIGGER]${JSON.stringify(payload)}`,
      }),
      analyze_job_description: tool({
        description:
          "Analyze a job description or company role requirements and compare them with Nacho's profile and work experience. Use this tool whenever a recruiter or user provides a job description, job requirements, or asks how Nacho fits a specific role or company.",
        inputSchema: z.object({
          job_description: z
            .string()
            .describe('The text of the job description or role requirements.'),
          locale: toolLocale,
        }),
        execute: async ({ job_description, locale }) =>
          JSON.stringify(await this.analyzeJobDescription(job_description, locale)),
      }),
    };
  }

  private async projectsForModel(locale: string) {
    const projects = await this.publicProjects(locale);
    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      slug: project.slug,
      demo: project.demo,
      repository: project.repository,
      technologies: project.technologies.map((tech) => tech.name),
    }));
  }

  private async experienceForModel(locale: string) {
    const experiences = await this.publicExperience(locale);
    return experiences.map((item) => ({
      id: item.id,
      title: item.title,
      company: item.company,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      isCurrent: item.isCurrent,
      link: item.link,
      tasks: item.tasks,
      technologies: item.technologies,
    }));
  }

  async analyzeJobDescription(
    jobDescription: string,
    locale: string,
  ): Promise<SuitabilityReport | { error: string }> {
    let projects: unknown;
    let experiences: unknown;
    try {
      [projects, experiences] = await Promise.all([
        this.projectsForModel(locale),
        this.experienceForModel(locale),
      ]);
    } catch (error) {
      this.logger.warn(`Portfolio unavailable for analysis: ${(error as Error).message}`);
      return { error: 'portfolio_unavailable' };
    }

    try {
      const { ai, model } = await this.model();
      const { output } = await ai.generateText({
        model,
        system: ANALYSIS_SYSTEM_PROMPT(locale),
        output: ai.Output.object({ schema: suitabilitySchema }),
        temperature: 0,
        prompt: `Here is Nacho's portfolio data:
- Projects: ${JSON.stringify(projects)}
- Experience: ${JSON.stringify(experiences)}

Compare it against this Job Description and return a structured report:
${jobDescription}`,
      });
      return output ?? { error: 'analysis_failed' };
    } catch (error) {
      this.logger.warn(`Suitability analysis failed: ${(error as Error).message}`);
      return { error: 'analysis_failed' };
    }
  }

  async summarize(body: string, locale: string): Promise<string> {
    const plain = body.replace(/\s+/g, ' ').trim();
    const { ai, model } = await this.model();
    const { text } = await ai.generateText({
      model,
      system: SUMMARIZE_SYSTEM_PROMPT(locale),
      prompt: plain,
      temperature: 0.3,
    });
    return text.trim();
  }

  async *chat(input: ChatRequestInput): AsyncGenerator<ChatStreamEvent> {
    const context = await this.knowledge.contextFor(input.message);

    const history: ModelMessage[] = input.history
      .slice(-HISTORY_LIMIT)
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .map((item) => ({ role: item.role as 'user' | 'assistant', content: item.content }));

    const { ai, model } = await this.model();
    const result = ai.streamText({
      model,
      system: `${CHAT_SYSTEM_PROMPT}\n\nContext:\n${context}\n\nLocale: ${input.locale} — use this locale when calling any tool that accepts a locale argument.`,
      messages: [...history, { role: 'user', content: input.message }],
      tools: this.tools(ai.tool),
      stopWhen: ai.stepCountIs(3),
      temperature: 0,
    });

    for await (const part of result.fullStream) {
      if (part.type === 'text-delta') {
        yield { type: 'text', delta: part.text };
      } else if (part.type === 'tool-call') {
        yield { type: 'tool', status: 'start', name: part.toolName };
      } else if (part.type === 'tool-result') {
        yield { type: 'tool', status: 'end', name: part.toolName };
      } else if (part.type === 'error') {
        throw part.error;
      }
    }
  }
}
