'use client';

import { Button } from '@/shared/components/ui/button';
import { Kbd, KbdGroup } from '@/shared/components/ui/kbd';
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
  autoFocus?: boolean;
}

export function ChatInput({
  message,
  isLoading,
  onMessageChange,
  onSubmit,
  isHero = false,
  autoFocus = false,
}: ChatInputProps) {
  const t = useTranslations('components.chat.page');
  const tChat = useTranslations('components.chat');
  const tInput = useTranslations('components.chat.input');
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

  useEffect(() => {
    if (!autoFocus) return;
    const frame = requestAnimationFrame(() => textareaRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [autoFocus]);

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
    <motion.div className="relative mx-auto w-full max-w-3xl p-4">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-end gap-2 rounded-xl border bg-card transition-all duration-300 ease-out ${
          isFocused ? 'border-ring/50' : 'border-border hover:border-foreground/20'
        } ${isHero ? 'min-h-14' : 'min-h-12'} ${isLoading ? 'opacity-70' : ''}`}
      >
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
          aria-describedby="chat-input-hint"
          className="w-full resize-none bg-transparent focus:ring-0 focus:outline-none pl-4 pr-4 py-3.5 max-h-50 overflow-y-auto text-foreground text-sm placeholder:text-muted-foreground/60 leading-relaxed"
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
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60"
              >
                <Spinner size="sm" variant="muted" />
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              >
                <Button
                  type="submit"
                  size="icon"
                  disabled={!hasContent}
                  aria-label={tInput('send')}
                  className="rounded-lg"
                >
                  <HugeiconsIcon icon={ArrowUp01Icon} className="size-4 stroke-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      <div
        id="chat-input-hint"
        className="mt-2 hidden items-center gap-4 px-1 text-[11px] text-muted-foreground sm:flex"
      >
        <span className="inline-flex items-center gap-1.5">
          <Kbd size="sm">Enter</Kbd>
          {tInput('sendHint')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <KbdGroup>
            <Kbd size="sm">Shift</Kbd>
            <span aria-hidden="true">+</span>
            <Kbd size="sm">Enter</Kbd>
          </KbdGroup>
          {tInput('newlineHint')}
        </span>
      </div>

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
