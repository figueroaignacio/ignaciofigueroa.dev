'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Icon, type IconName } from '@/shared/components/tech-icons/index';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={itemVariants}
        className="space-y-2"
      >
        <h2 id="tech-stack-title" className="text-2xl font-medium tracking-tight">
          {t('stack.title')}
        </h2>
        <p className="text-lg text-muted-foreground font-normal mt-1 max-w-xl">
          {t('stack.description')}
        </p>
      </motion.div>

      <div className="space-y-6">
        {techStack.map((section) => (
          <div key={section.category} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1">
              {section.category}
            </h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-wrap gap-2"
              role="list"
            >
              {section.items.map((name) => (
                <motion.li
                  key={name}
                  variants={itemVariants}
                  whileHover={{ y: -2, backgroundColor: 'var(--color-secondary)' }}
                  className="flex items-center gap-2 rounded-full border-border border px-3 py-1.5 bg-background/40 backdrop-blur-[2px] transition-colors duration-200 group"
                  role="listitem"
                >
                  <span aria-hidden="true" className="size-4 flex items-center justify-center">
                    <Icon name={iconMap[name]} />
                  </span>
                  <span className="text-xs font-medium">{name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </section>
  );
}
