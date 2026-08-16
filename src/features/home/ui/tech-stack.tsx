import { Icon, type IconName } from '@/shared/components/tech-icons/index';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
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
      <div className="scroll-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
        {techStack.map((section) => (
          <div key={section.category} className="rounded-xl border border-border bg-card p-4">
            <h3 className="type-label text-muted-foreground">{section.category}</h3>
            <TechChipGroup role="list" className="mt-3">
              {section.items.map((name) => {
                const isCore = CORE_STACK.has(name);
                return (
                  <TechChip
                    key={name}
                    role="listitem"
                    tone={isCore ? 'lead' : 'muted'}
                    icon={
                      <Icon
                        name={iconMap[name]}
                        width={isCore ? 14 : 12}
                        height={isCore ? 14 : 12}
                      />
                    }
                  >
                    {name}
                  </TechChip>
                );
              })}
            </TechChipGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
