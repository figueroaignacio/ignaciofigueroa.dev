import {
  CodeIcon,
  FolderIcon,
  MailIcon,
  MessageCircleIcon,
  SparklesIcon,
  ZapIcon,
} from '@/shared/components/icons';
import { buttonVariants } from '@/shared/components/ui/button-variants';
import { cn } from '@/shared/lib/cn';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const t = useTranslations('components.chat.suggestions');

  const suggestions = [
    {
      icon: MessageCircleIcon,
      text: t('who'),
    },
    {
      icon: FolderIcon,
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
      icon: ZapIcon,
      text: t('recruiterMode'),
    },
    {
      icon: MailIcon,
      text: t('contact'),
    },
  ];

  return (
    <div className="flex max-w-sm flex-wrap justify-center gap-1.5">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <motion.button
            type="button"
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'h-auto gap-1.5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3 shrink-0 opacity-70" />
            <span>{suggestion.text}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
