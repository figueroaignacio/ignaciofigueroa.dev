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

  const hasContent = message.trim().length > 0;

  return (
    <motion.div
      className={`relative w-full ${isHero ? 'max-w-3xl mx-auto container' : 'max-w-3xl container mx-auto'}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-end gap-2 rounded-2xl border transition-all duration-300 ${
          isFocused
            ? 'border-[#E8845A]/40 bg-card shadow-[0_0_0_4px_rgba(232,132,90,0.12)]'
            : 'border-border/40 bg-card/60 dark:bg-card/30 backdrop-blur-md hover:border-border/80 hover:bg-card'
        } ${isHero ? 'min-h-14' : 'min-h-12'} ${isLoading ? 'opacity-70' : ''}`}
      >
        {/* Subtle decorative brand status dot */}
        <div className="absolute top-3.5 left-4 flex items-center justify-center pointer-events-none">
          <span className={`w-2 h-2 rounded-full transition-all duration-500 ${isFocused ? 'bg-[#E8845A] shadow-[0_0_8px_rgba(232,132,90,0.6)] animate-pulse' : 'bg-muted-foreground/30'}`} />
        </div>

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
          className="w-full resize-none bg-transparent focus:ring-0 focus:outline-none pl-8 pr-4 py-3.5 max-h-50 overflow-y-auto text-foreground text-sm placeholder:text-muted-foreground/45 leading-relaxed"
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8845A]/10 text-[#E8845A]"
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
                whileTap={{ scale: 0.90 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                disabled={!hasContent}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                  hasContent
                    ? 'bg-[#E8845A] text-white cursor-pointer shadow-[0_2px_8px_rgba(232,132,90,0.25)] hover:bg-[#D4704A] hover:shadow-[0_4px_12px_rgba(232,132,90,0.4)]'
                    : 'bg-muted-foreground/10 text-muted-foreground/30 cursor-not-allowed'
                }`}
              >
                <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4 stroke-[2]" />
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
              className="text-[10px] text-muted-foreground/35 text-center px-4 leading-relaxed"
            >
              {disclaimers[disclaimerIndex]}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
