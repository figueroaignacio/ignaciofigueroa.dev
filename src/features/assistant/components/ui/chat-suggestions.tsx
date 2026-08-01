import {
  BulbIcon,
  CodeIcon,
  Folder01Icon,
  Mail01Icon,
  Message01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const t = useTranslations('components.chat.suggestions');

  const suggestions = [
    {
      icon: Message01Icon,
      text: t('who'),
    },
    {
      icon: Folder01Icon,
      text: t('projects'),
    },
    {
      icon: CodeIcon,
      text: t('technologies'),
    },
    {
      icon: SparklesIcon,
      text: t('education'),
    },
    {
      icon: BulbIcon,
      text: t('recruiterMode'),
    },
    {
      icon: Mail01Icon,
      text: t('contact'),
    },
  ];

  return (
    <div className="flex flex-wrap max-w-sm justify-center gap-1.5">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <motion.button
            type="button"
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 200,
              delay: index * 0.04,
            }}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-secondary/30 hover:bg-secondary/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            <HugeiconsIcon icon={Icon} className="size-3 shrink-0 opacity-80" />
            <span className="text-[11px] font-mono">{suggestion.text}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
