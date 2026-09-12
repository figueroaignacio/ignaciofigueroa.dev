'use client';

import { sendContactEmailAction } from '@/features/home/actions/send-email';
import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createEventParser, type StreamEvent, type ToolName } from '../lib/parse-stream';
import type { Message } from '../types';

export type { ToolName };

const STORAGE_KEY = 'chat-messages';

const HISTORY_LIMIT = 20;

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
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolName | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
        const response = await fetch(`${ASSISTANT_API_URL}/chat?stream=events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: messages.slice(-HISTORY_LIMIT),
            locale,
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let streamedText = '';

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        const appendText = (delta: string) => {
          // The first answer token means the tool work is done and the model is
          // writing. Clearing here rather than on the tool's "end" event avoids
          // flashing back to the generic loader during the gap between them.
          if (!streamedText) setActiveTool(null);

          streamedText += delta;
          const text = streamedText;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: text,
            };
            return updated;
          });
        };

        // The backend keeps the bare token stream as its default and only emits
        // NDJSON when asked. Branching on the content type means a rolled-back
        // backend still renders correctly instead of printing raw JSON.
        const isEventStream = response.headers
          .get('content-type')
          ?.includes('application/x-ndjson');

        const parser = createEventParser();

        const applyEvent = (event: StreamEvent) => {
          if (event.type === 'text') appendText(event.delta);
          else if (event.type === 'tool' && event.status === 'start') setActiveTool(event.name);
        };

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decoded = decoder.decode(value, { stream: true });

          if (!isEventStream) {
            appendText(decoded);
            continue;
          }

          parser.push(decoded).forEach(applyEvent);
        }

        if (isEventStream) parser.flush().forEach(applyEvent);

        setMessages((prev) => {
          persistMessages(prev);
          return prev;
        });

        if (streamedText.includes('[SEND_EMAIL_TRIGGER]')) {
          const match = streamedText.match(/\[SEND_EMAIL_TRIGGER\](\{[\s\S]*?\})/);
          if (match) {
            try {
              const { name, email, message: msgBody } = JSON.parse(match[1]);

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

              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg) {
                  if (result.success) {
                    const successPayload = JSON.stringify({ name, email, message: msgBody });
                    lastMsg.content = lastMsg.content.replace(
                      '[EMAIL_SENDING]',
                      `[EMAIL_SUCCESS:${successPayload}]`,
                    );
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
        setActiveTool(null);
        abortRef.current = null;
      }
    },
    [isLoading, t, locale],
  );

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setActiveTool(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    isLoading,
    activeTool,
    sendMessage,
    resetChat,
    isMounted,
  } as const;
}
