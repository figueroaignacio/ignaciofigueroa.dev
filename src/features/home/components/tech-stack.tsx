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
    <section id="stack" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('stack.title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <div className="space-y-6">
        {techStack.map((section) => (
          <div key={section.category} className="space-y-2">
            <h3 className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground/80">
              {section.category}
            </h3>
            <p className="text-sm font-mono text-foreground/90 leading-relaxed">
              {section.items.map((name) => name.toLowerCase()).join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
