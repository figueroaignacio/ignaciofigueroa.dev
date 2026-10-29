import { Icon, type IconName } from '@/shared/components/tech-icons/index';
import { Section } from '@/shared/components/ui/section';
import { cn } from '@/shared/lib/cn';
import { useTranslations } from 'next-intl';

const iconMap: Record<string, IconName> = {
  Vite: 'vite',
  React: 'react',
  NextJS: 'nextjs',
  TypeScript: 'typescript',
  TailwindCSS: 'tailwind',
  CSS: 'css',
  HTML: 'html',
  NodeJS: 'nodejs',
  'Nest.js': 'nestjs',
  Python: 'python',
  FastAPI: 'fastapi',
  PostgreSQL: 'postgres',
  'Claude Code': 'claudeCode',
  'Open Code': 'openCode',
  'Antigravity IDE': 'googleAntigravity',
  'Antigravity CLI': 'googleAntigravity',
  'Vercel AI SDK': 'vercel',
  'GenAI SDK': 'gemini',
  'Groq SDK': 'groq',
  Git: 'git',
  GitHub: 'github',
  pnpm: 'pnpm',
  Turborepo: 'turborepo',
  UV: 'uv',
  Linux: 'linux',
  Fedora: 'fedora',
};

/**
 * The tools worth remembering. Everything outside this set renders muted so the
 * grid reads as "these, plus supporting cast" instead of one flat wall of chips.
 */
const CORE_STACK = new Set([
  'React',
  'NextJS',
  'TypeScript',
  'TailwindCSS',
  'NodeJS',
  'Python',
  'PostgreSQL',
  'Claude Code',
  'Vercel AI SDK',
  'Git',
  'Linux',
]);

export function TechStack() {
  const t = useTranslations('sections');

  const techStack = [
    {
      category: t('stack.categories.frontend'),
      items: ['Vite', 'React', 'NextJS', 'TypeScript', 'TailwindCSS', 'CSS', 'HTML'],
    },
    {
      category: t('stack.categories.backend'),
      items: ['NodeJS', 'Nest.js', 'Python', 'FastAPI', 'PostgreSQL'],
    },
    {
      category: t('stack.categories.ai'),
      items: [
        'Claude Code',
        'Open Code',
        'Antigravity IDE',
        'Antigravity CLI',
        'Vercel AI SDK',
        'GenAI SDK',
        'Groq SDK',
      ],
    },
    {
      category: t('stack.categories.others'),
      items: ['Git', 'GitHub', 'pnpm', 'Turborepo', 'UV', 'Linux', 'Fedora'],
    },
  ];

  return (
    <Section id="stack" title={t('stack.title')}>
      <div className="flex flex-col gap-10" data-reveal>
        {techStack.map((section) => (
          <div
            key={section.category}
            className="grid gap-x-8 gap-y-3 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
          >
            <h3 className="pt-1 text-[15px] font-normal text-muted-foreground">
              {section.category}
            </h3>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {section.items.map((name) => {
                const isCore = CORE_STACK.has(name);
                return (
                  <li
                    key={name}
                    className={cn(
                      'group/tech inline-flex items-center gap-2 text-lg font-medium tracking-[-0.02em]',
                      isCore ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    <Icon
                      name={iconMap[name]}
                      width={18}
                      height={18}
                      className={cn(
                        'shrink-0 transition-[filter,translate] duration-300 group-hover/tech:-translate-y-0.5',
                        !isCore &&
                          'opacity-70 grayscale group-hover/tech:opacity-100 group-hover/tech:grayscale-0',
                      )}
                    />
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
