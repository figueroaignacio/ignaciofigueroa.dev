'use client';

import { Spinner } from '@/shared/components/ui/spinner';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isHero?: boolean;
}

export function ChatInput({
  message,
  isLoading,
  onMessageChange,
  onSubmit,
  isHero = false,
}: ChatInputProps) {
  const t = useTranslations('components.chat.page');
  const tChat = useTranslations('components.chat');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const disclaimers = tChat.raw('disclaimers') as string[];
  const [disclaimerIndex, setDisclaimerIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setDisclaimerIndex(Math.floor(Math.random() * disclaimers.length));
  }, [disclaimers.length]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  return (
    <motion.div
      className={`relative w-full ${isHero ? 'max-w-3xl mx-auto container' : 'max-w-3xl container mx-auto'}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-end gap-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 focus-within:border-border focus-within:bg-card transition-all duration-200 ${
          isHero ? 'min-h-[56px]' : 'min-h-[48px]'
        } ${isLoading ? 'opacity-80' : ''}`}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('inputPlaceholder')}
          rows={1}
          disabled={isLoading}
          className={`w-full resize-none bg-transparent focus:ring-0 focus:outline-none px-5 py-3.5 max-h-[200px] overflow-y-auto placeholder:text-muted-foreground/50 ${
            isHero ? 'text-base' : 'text-sm'
          }`}
          style={{ minHeight: isHero ? '56px' : '48px' }}
        />
        <div className="flex pb-2 pr-2">
          <motion.button
            type="submit"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!message.trim() && !isLoading}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
              message.trim() || isLoading
                ? 'bg-foreground text-background cursor-pointer'
                : 'bg-transparent text-muted-foreground/20 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Spinner /> : <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4" />}
          </motion.button>
        </div>
      </form>
      {isHero && (
        <motion.div
          className="mt-4 flex justify-center text-[11px] text-muted-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {mounted && (
            <span key={disclaimerIndex} className="text-center px-4">
              {disclaimers[disclaimerIndex]}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
