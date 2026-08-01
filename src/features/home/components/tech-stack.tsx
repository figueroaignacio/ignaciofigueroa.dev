import { Icon, type IconName } from '@/shared/components/tech-icons/index';
import { ItemCard } from '@/shared/components/ui/item-card';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {techStack.map((section) => (
          <ItemCard
            key={section.category}
            header={
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/80">
                {section.category}
              </h3>
            }
          >
            <TechChipGroup role="list">
              {section.items.map((name) => (
                <TechChip
                  key={name}
                  role="listitem"
                  icon={<Icon name={iconMap[name]} width={12} height={12} />}
                >
                  {name}
                </TechChip>
              ))}
            </TechChipGroup>
          </ItemCard>
        ))}
      </div>
    </Section>
  );
}
