'use client';

import { LinuxIcon } from '@/shared/components/tech-icons/linux-icon';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/cn';
import type { Icon } from '@/shared/lib/constants';
import {
  AiBrain01Icon,
  CloudServerIcon,
  ComputerTerminal01Icon,
  FaceIdIcon,
  FlashIcon,
  FlowCircleIcon,
  Globe02Icon,
  Layout01Icon,
  PuzzleIcon,
  SecurityIcon,
  TestTube01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { AnimatedSectionHeader } from './animated-section-header';

type InterestConfig = {
  key: string;
  icon: Icon;
  color: string;
};

const INTERESTS_CONFIG: InterestConfig[] = [
  { key: 'frontend', icon: Layout01Icon, color: 'text-cyan-500' },
  { key: 'backend', icon: CloudServerIcon, color: 'text-emerald-500' },
  { key: 'ai', icon: AiBrain01Icon, color: 'text-violet-500' },
  { key: 'prompts', icon: ComputerTerminal01Icon, color: 'text-amber-500' },
  { key: 'arch', icon: PuzzleIcon, color: 'text-blue-500' },
  { key: 'clean', icon: SecurityIcon, color: 'text-rose-500' },
  { key: 'ui', icon: Layout01Icon, color: 'text-pink-500' },
  { key: 'a11y', icon: FaceIdIcon, color: 'text-indigo-500' },
  { key: 'perf', icon: FlashIcon, color: 'text-orange-500' },
  { key: 'qa', icon: TestTube01Icon, color: 'text-lime-500' },
  { key: 'devops', icon: FlowCircleIcon, color: 'text-sky-500' },
  { key: 'opensource', icon: Globe02Icon, color: 'text-green-500' },
  { key: 'linux', icon: LinuxIcon, color: 'text-foreground' },
];

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

export function Interests() {
  const t = useTranslations('sections.interests.items');
  const tSection = useTranslations('sections.interests');

  return (
    <section className="space-y-6" aria-labelledby="interests-title">
      <AnimatedSectionHeader
        id="interests-title"
        title={tSection('title')}
        description={tSection('description')}
      />
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="flex flex-wrap gap-2"
        role="list"
      >
        {INTERESTS_CONFIG.map(({ key, icon: Icon, color }) => (
          <motion.li key={key} variants={itemVariants} role="listitem">
            <Badge
              variant="outline"
              className="space-x-3 py-2 px-4 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 cursor-default group"
            >
              {typeof Icon === 'function' ? (
                <Icon className={cn('w-3.5 h-3.5 transition-colors', color)} aria-hidden="true" />
              ) : (
                <HugeiconsIcon
                  icon={Icon}
                  className={cn('w-3.5 h-3.5 transition-colors', color)}
                  aria-hidden="true"
                />
              )}
              <span className="text-xs">{t(key)}</span>
            </Badge>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
