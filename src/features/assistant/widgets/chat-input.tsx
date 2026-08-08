'use client';

import { Spinner } from '@/shared/components/ui/spinner';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
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

  const hasContent = message.trim().length > 0;

  return (
    /* The chat overlay sits outside the page frame, so it carries its own
       measure. Both branches of the old ternary were the same classes in a
       different order. */
    <motion.div className="relative mx-auto w-full max-w-3xl p-4">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-end gap-2 rounded-xl border bg-card transition-all duration-300 ease-out ${
          isFocused ? 'border-ring/50' : 'border-border hover:border-foreground/20'
        } ${isHero ? 'min-h-14' : 'min-h-12'} ${isLoading ? 'opacity-70' : ''}`}
      >
        <div className="flex items-center pl-4 pb-3.5 shrink-0 self-end"></div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('inputPlaceholder')}
          rows={1}
          disabled={isLoading}
          className="w-full resize-none bg-transparent focus:ring-0 focus:outline-none pl-1 pr-4 py-3.5 max-h-50 overflow-y-auto text-foreground text-sm placeholder:text-muted-foreground/60 leading-relaxed"
          style={{ minHeight: isHero ? '56px' : '48px' }}
        />

        <div className="flex pb-2 pr-2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground"
              >
                <Spinner />
              </motion.div>
            ) : (
              <motion.button
                key="send"
                type="submit"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                disabled={!hasContent}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                  hasContent
                    ? 'bg-primary text-primary-foreground cursor-pointer hover:opacity-90 active:scale-95'
                    : 'bg-secondary/60 text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4 stroke-2" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>

      {isHero && (
        <motion.div
          className="mt-3 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {mounted && (
            <span
              key={disclaimerIndex}
              className="text-[11px] font-mono text-muted-foreground text-center px-4 leading-relaxed"
            >
              {disclaimers[disclaimerIndex]}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
