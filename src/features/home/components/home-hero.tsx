'use client';

import { AssistantAvatar } from '@/features/assistant/components/ui/assistant-avatar';
import { Link } from '@/i18n/navigation';
import { DocumentCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export function HomeHero() {
  const t = useTranslations('sections.home');
  const tCv = useTranslations('components.ctaCv');

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <motion.section
      className="space-y-6 mt-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
        {t('greeting')}
      </motion.p>
      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl font-normal tracking-tight text-balance leading-[1.05]"
      >
        {t('name')}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance"
      >
        <span className="text-foreground font-medium">{t('title')}</span>
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-muted-foreground leading-relaxed max-w-2xl text-balance"
      >
        {t('description')}
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/assistant"
          className="btn btn-primary group"
          onClick={handleChatClick}
        >
          {t('actions.chatAssistant')}
          <div className="transition-transform duration-300 group-hover:scale-110">
            <AssistantAvatar size="sm" />
          </div>
        </Link>
        <a
          href={tCv('url')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline hover:bg-muted/50 transition-all duration-300"
        >
          <HugeiconsIcon icon={DocumentCodeIcon} className="size-4" />
          {t('actions.viewCv')}
        </a>
      </motion.div>
    </motion.section>
  );
}
