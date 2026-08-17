'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { ToolName } from '../lib/parse-stream';
import type { Message } from '../types';
import { ChatLoading } from '../ui/chat-loading';
import { ChatSuggestions } from '../ui/chat-suggestions';
import { ChatMessage } from './chat-message';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  activeTool?: ToolName | null;
  onSuggestionClick: (text: string) => void;
}

export function ChatMessages({
  messages,
  isLoading,
  activeTool,
  onSuggestionClick,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const el = messagesEndRef.current;
      const parent = el.closest('.overflow-y-auto');

      if (parent) {
        const isNearBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight < 150;

        if (isNearBottom || !isLoading) {
          el.scrollIntoView({
            behavior: isLoading ? 'auto' : 'smooth',
            block: 'end',
          });
        }
      } else {
        el.scrollIntoView({
          behavior: isLoading ? 'auto' : 'smooth',
          block: 'end',
        });
      }
    }
  }, [messages.length, isLoading]);

  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="flex w-full min-w-0 flex-col gap-7 px-4">
      {messages.map((msg, idx) => {
        const isAssistant = msg.role === 'assistant';
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex min-w-0 ${isAssistant ? 'flex-col gap-2.5' : 'justify-end'}`}
          >
            <ChatMessage message={msg} />
          </motion.div>
        );
      })}

      {showSuggestions && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <ChatSuggestions onSuggestionClick={onSuggestionClick} />
        </motion.div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-2.5">
          <div className="">
            <ChatLoading activeTool={activeTool} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
