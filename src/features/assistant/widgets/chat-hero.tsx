'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { AssistantAvatar } from '../ui/assistant-avatar';
import { ChatSuggestions } from '../ui/chat-suggestions';

interface ChatHeroProps {
  onQuickAction: (text: string) => void;
}

export function ChatHero({ onQuickAction }: ChatHeroProps) {
  const t = useTranslations('components.chat.page');

  return (
    <div className="flex flex-col justify-center items-center min-h-[40vh] max-w-3xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="relative"
      >
        {}
        <div className="absolute inset-0 -z-10 rounded-full blur-3xl bg-primary/15 scale-150 animate-pulse duration-6000" />

        <AssistantAvatar size="xl" />
      </motion.div>

      <motion.div
        className="space-y-3 mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="type-page-title text-balance text-foreground">{t('greeting')}</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto text-balance leading-relaxed">
          {t('subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <ChatSuggestions onSuggestionClick={onQuickAction} />
      </motion.div>
    </div>
  );
}
