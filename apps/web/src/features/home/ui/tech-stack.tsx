import { Icon, type IconName } from '@/shared/components/tech-icons/index';
import { Section } from '@/shared/components/ui/section';
import { cn } from '@/shared/lib/cn';
import { useTranslations } from 'next-intl';

type Tech = { name: string; icon?: IconName };

const STACK: {
  key: 'frontend' | 'backend' | 'ai' | 'testing' | 'others';
  core: Tech[];
  rest: Tech[];
}[] = [
  {
    key: 'frontend',
    core: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
    rest: [
      { name: 'shadcn/ui', icon: 'shadcn' },
      { name: 'Base UI', icon: 'baseUi' },
      { name: 'Motion', icon: 'motion' },
      { name: 'TanStack Table', icon: 'tanstack' },
      { name: 'React Hook Form', icon: 'reactHookForm' },
      { name: 'Zustand' },
      { name: 'Tiptap' },
      { name: 'next-intl' },
      { name: 'MDX', icon: 'mdx' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    key: 'backend',
    core: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'Supabase', icon: 'supabase' },
    ],
    rest: [
      { name: 'Nest.js', icon: 'nestjs' },
      { name: 'Drizzle ORM', icon: 'drizzle' },
      { name: 'Zod', icon: 'zod' },
      { name: 'Resend', icon: 'resend' },
    ],
  },
  {
    key: 'ai',
    core: [
      { name: 'Claude Code', icon: 'claudeCode' },
      { name: 'Vercel AI SDK', icon: 'vercel' },
      { name: 'MCP', icon: 'mcp' },
    ],
    rest: [
      { name: 'OpenRouter', icon: 'openRouter' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'Groq', icon: 'groq' },
      { name: 'Open Code', icon: 'openCode' },
      { name: 'Antigravity', icon: 'googleAntigravity' },
    ],
  },
  {
    key: 'testing',
    core: [
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Playwright', icon: 'playwright' },
    ],
    rest: [
      { name: 'Jest', icon: 'jest' },
      { name: 'Testing Library', icon: 'testingLibrary' },
      { name: 'axe-core' },
      { name: 'ESLint', icon: 'eslint' },
      { name: 'Prettier', icon: 'prettier' },
    ],
  },
  {
    key: 'others',
    core: [
      { name: 'Git', icon: 'git' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Linux', icon: 'linux' },
    ],
    rest: [
      { name: 'GitHub Actions', icon: 'githubActions' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Turborepo', icon: 'turborepo' },
      { name: 'pnpm', icon: 'pnpm' },
      { name: 'Sentry', icon: 'sentry' },
      { name: 'Linear', icon: 'linear' },
      { name: 'Fedora', icon: 'fedora' },
    ],
  },
];

function TechItem({ tech, core }: { tech: Tech; core: boolean }) {
  return (
    <li
      className={cn(
        'group/tech flex items-center gap-2.5',
        core ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      {tech.icon ? (
        <Icon
          name={tech.icon}
          width={17}
          height={17}
          className={cn(
            'shrink-0 transition-[filter,opacity] duration-300',
            !core &&
              'opacity-70 grayscale group-hover/tech:opacity-100 group-hover/tech:grayscale-0',
          )}
        />
      ) : (
        <span aria-hidden className="mx-[5.5px] size-1.5 shrink-0 bg-current opacity-60" />
      )}
      {tech.name}
    </li>
  );
}

export function TechStack() {
  const t = useTranslations('sections');

  return (
    <Section id="stack" title={t('stack.title')}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10" data-reveal>
        {STACK.map((group) => (
          <div key={group.key} className="flex flex-col gap-2.5 sm:gap-3">
            <h3 className="text-sm font-normal text-muted-foreground sm:text-[15px]">
              {t(`stack.categories.${group.key}`)}
            </h3>
            <ul className="flex flex-col gap-[7px] text-[15px] font-medium tracking-[-0.01em] sm:gap-2 sm:text-[17px]">
              {group.core.map((tech) => (
                <TechItem key={tech.name} tech={tech} core />
              ))}
              {group.rest.map((tech) => (
                <TechItem key={tech.name} tech={tech} core={false} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
