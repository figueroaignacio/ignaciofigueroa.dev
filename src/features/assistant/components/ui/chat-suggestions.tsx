import {
  BulbIcon,
  CodeIcon,
  Folder01Icon,
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
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-card hover:border-border/80 text-muted-foreground hover:text-foreground transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
          >
            <HugeiconsIcon icon={Icon} className="size-3 shrink-0 opacity-70" />
            <span className="text-[11px] font-medium">{suggestion.text}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
