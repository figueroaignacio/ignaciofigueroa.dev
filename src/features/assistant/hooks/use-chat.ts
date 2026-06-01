'use client';

import { sendContactEmailAction } from '@/features/home/actions/send-email';
import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Message } from '../types';

const STORAGE_KEY = 'chat-messages';

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

export function useChat() {
  const t = useTranslations('components.chat.messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate from localStorage once
  useEffect(() => {
    setMessages(loadMessages());
    setIsMounted(true);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userMessage: Message = { role: 'user', content: trimmed };

      setMessages((prev) => {
        const next = [...prev, userMessage];
        persistMessages(next);
        return next;
      });
      setIsLoading(true);

      try {
        const response = await fetch(`${ASSISTANT_API_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: messages,
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let streamedText = '';

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          streamedText += decoder.decode(value, { stream: true });
          const text = streamedText;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: text,
            };
            return updated;
          });
        }

        setMessages((prev) => {
          persistMessages(prev);
          return prev;
        });

        // Intercept [SEND_EMAIL_TRIGGER] and trigger NextJS server action from client
        if (streamedText.includes('[SEND_EMAIL_TRIGGER]')) {
          const match = streamedText.match(/\[SEND_EMAIL_TRIGGER\](\{[\s\S]*?\})/);
          if (match) {
            try {
              const { name, email, message: msgBody } = JSON.parse(match[1]);

              // Transition to sending state
              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg) {
                  lastMsg.content = streamedText.replace(
                    /\[SEND_EMAIL_TRIGGER\]\{[\s\S]*?\}/,
                    '[EMAIL_SENDING]',
                  );
                }
                persistMessages(updated);
                return updated;
              });

              const result = await sendContactEmailAction({
                name,
                email,
                message: msgBody,
              });

              // Update state based on result
              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg) {
                  if (result.success) {
                    lastMsg.content = lastMsg.content.replace('[EMAIL_SENDING]', '[EMAIL_SUCCESS]');
                  } else {
                    const errorMsg = result.error || 'Unknown error';
                    lastMsg.content = lastMsg.content.replace(
                      '[EMAIL_SENDING]',
                      `[EMAIL_ERROR:${errorMsg}]`,
                    );
                  }
                }
                persistMessages(updated);
                return updated;
              });
            } catch (e) {
              console.error('Failed to parse email trigger:', e);
            }
          }
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;

        console.error('Chat error:', error);
        setMessages((prev) => {
          const next = [...prev, { role: 'assistant' as const, content: t('error') }];
          persistMessages(next);
          return next;
        });
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, t],
  );

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
    isMounted,
  } as const;
}
