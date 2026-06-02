import { useTranslations } from 'next-intl';

import { Icon, type IconName } from '@/shared/components/tech-icons/index';

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
  'Google Antigravity': 'googleAntigravity',
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
        'Google Antigravity',
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
    <section className="space-y-8" aria-labelledby="tech-stack-title">
      <div>
        <h2 id="tech-stack-title" className="text-xl font-bold tracking-tight text-foreground">
          {t('stack.title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {t('stack.description')}
        </p>
      </div>

      <div className="space-y-6">
        {techStack.map((section) => (
          <div key={section.category} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1">
              {section.category}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {section.items.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-full border-border border px-3 py-1.5 bg-background/40 backdrop-blur-[2px] hover:-translate-y-0.5 hover:bg-secondary/40 transition-all duration-200 group"
                  role="listitem"
                >
                  <span aria-hidden="true" className="size-4 flex items-center justify-center">
                    <Icon name={iconMap[name]} />
                  </span>
                  <span className="text-xs font-medium">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
