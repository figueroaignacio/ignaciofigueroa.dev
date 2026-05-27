import { ClaudeCodeIcon } from './claude-code-icon';
import { CSSIcon } from './css-icon';
import { FastAPIIcon } from './fastapi-icon';
import { FedoraIcon } from './fedora-icon';
import { GeminiIcon } from './gemini-icon';
import { GitIcon } from './git-icon';
import { GitHubIcon } from './github-icon';
import { GoogleAntigravityIcon } from './google-antigravity-icon';
import { GroqAiIcon } from './groq-ai-icon';
import { HTMLIcon } from './html-icon';
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
  claudeCode: ClaudeCodeIcon,
  openCode: OpenCodeIcon,
  googleAntigravity: GoogleAntigravityIcon,
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
  ClaudeCodeIcon,
  CSSIcon,
  FastAPIIcon,
  FedoraIcon,
  GeminiIcon,
  GitHubIcon,
  GitIcon,
  GoogleAntigravityIcon,
  GroqAiIcon,
  HTMLIcon,
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
};
