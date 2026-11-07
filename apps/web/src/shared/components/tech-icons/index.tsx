import { AnthropicIcon } from './anthropic-icon';
import { ClaudeCodeIcon } from './claude-code-icon';
import { CSSIcon } from './css-icon';
import { FastAPIIcon } from './fastapi-icon';
import { FedoraIcon } from './fedora-icon';
import { GeminiIcon } from './gemini-icon';
import { GitIcon } from './git-icon';
import { GitHubIcon } from './github-icon';
import { GoogleAntigravityIcon } from './google-antigravity-icon';
import { GoogleIcon } from './google-icon';
import { GroqAiIcon } from './groq-ai-icon';
import { HTMLIcon } from './html-icon';
import { LinkedInIcon } from './linkedin-icon';
import { LinuxIcon } from './linux-icon';
import { NestJsIcon } from './nestjs-icon';
import { NextJSIcon } from './nextjs-icon';
import { NodeJSIcon } from './nodejs-icon';
import { OpenCodeIcon } from './open-code-icon';
import { PGIcon } from './pg-icon';
import { PnpmIcon } from './pnpm-icon';
import { PythonIcon } from './python-icon';
import { ReactIcon } from './react-icon';
import { TailwindIcon } from './tailwind-icon';
import { TurborepoIcon } from './turborepo-icon';
import { TypescriptIcon } from './typescript-icon';
import { UVIcon } from './uv-icon';
import { VercelIcon } from './vercel-icon';
import { ViteIcon } from './vite-icon';
import { ShadcnIcon } from './shadcn-icon';
import { BaseUIIcon } from './base-ui-icon';
import { MotionIcon } from './motion-icon';
import { TanStackIcon } from './tanstack-icon';
import { ReactHookFormIcon } from './react-hook-form-icon';
import { MDXIcon } from './mdx-icon';
import { SupabaseIcon } from './supabase-icon';
import { DrizzleIcon } from './drizzle-icon';
import { ZodIcon } from './zod-icon';
import { ResendIcon } from './resend-icon';
import { MCPIcon } from './mcp-icon';
import { OpenRouterIcon } from './open-router-icon';
import { VitestIcon } from './vitest-icon';
import { PlaywrightIcon } from './playwright-icon';
import { JestIcon } from './jest-icon';
import { TestingLibraryIcon } from './testing-library-icon';
import { ESLintIcon } from './eslint-icon';
import { PrettierIcon } from './prettier-icon';
import { GitHubActionsIcon } from './github-actions-icon';
import { DockerIcon } from './docker-icon';
import { SentryIcon } from './sentry-icon';
import { LinearIcon } from './linear-icon';

const iconComponents = {
  react: ReactIcon,
  nextjs: NextJSIcon,
  typescript: TypescriptIcon,
  tailwind: TailwindIcon,
  css: CSSIcon,
  html: HTMLIcon,
  nodejs: NodeJSIcon,
  nestjs: NestJsIcon,
  python: PythonIcon,
  fastapi: FastAPIIcon,
  postgres: PGIcon,
  anthropic: AnthropicIcon,
  claudeCode: ClaudeCodeIcon,
  openCode: OpenCodeIcon,
  googleAntigravity: GoogleAntigravityIcon,
  google: GoogleIcon,
  vercel: VercelIcon,
  gemini: GeminiIcon,
  groq: GroqAiIcon,
  git: GitIcon,
  github: GitHubIcon,
  pnpm: PnpmIcon,
  turborepo: TurborepoIcon,
  uv: UVIcon,
  linux: LinuxIcon,
  fedora: FedoraIcon,
  vite: ViteIcon,
  shadcn: ShadcnIcon,
  baseUi: BaseUIIcon,
  motion: MotionIcon,
  tanstack: TanStackIcon,
  reactHookForm: ReactHookFormIcon,
  mdx: MDXIcon,
  supabase: SupabaseIcon,
  drizzle: DrizzleIcon,
  zod: ZodIcon,
  resend: ResendIcon,
  mcp: MCPIcon,
  openRouter: OpenRouterIcon,
  vitest: VitestIcon,
  playwright: PlaywrightIcon,
  jest: JestIcon,
  testingLibrary: TestingLibraryIcon,
  eslint: ESLintIcon,
  prettier: PrettierIcon,
  githubActions: GitHubActionsIcon,
  docker: DockerIcon,
  sentry: SentryIcon,
  linear: LinearIcon,
};

export type IconName = keyof typeof iconComponents;

export const iconNames = Object.keys(iconComponents) as IconName[];

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
}

export function Icon({ name, width = 20, height = 20, className }: IconProps) {
  const Component = iconComponents[name];
  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="flex items-center justify-center w-full h-full [&>svg]:w-full [&>svg]:h-full">
        <Component />
      </div>
    </div>
  );
}

export {
  AnthropicIcon,
  ClaudeCodeIcon,
  CSSIcon,
  FastAPIIcon,
  FedoraIcon,
  GeminiIcon,
  GitHubIcon,
  GitIcon,
  GoogleAntigravityIcon,
  GoogleIcon,
  GroqAiIcon,
  HTMLIcon,
  LinkedInIcon,
  LinuxIcon,
  NestJsIcon,
  NextJSIcon,
  NodeJSIcon,
  OpenCodeIcon,
  PGIcon,
  PnpmIcon,
  PythonIcon,
  ReactIcon,
  TailwindIcon,
  TurborepoIcon,
  TypescriptIcon,
  UVIcon,
  VercelIcon,
  ViteIcon,
  ShadcnIcon,
  BaseUIIcon,
  MotionIcon,
  TanStackIcon,
  ReactHookFormIcon,
  MDXIcon,
  SupabaseIcon,
  DrizzleIcon,
  ZodIcon,
  ResendIcon,
  MCPIcon,
  OpenRouterIcon,
  VitestIcon,
  PlaywrightIcon,
  JestIcon,
  TestingLibraryIcon,
  ESLintIcon,
  PrettierIcon,
  GitHubActionsIcon,
  DockerIcon,
  SentryIcon,
  LinearIcon,
};
