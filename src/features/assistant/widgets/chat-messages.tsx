'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { Message } from '../types';
import { ChatMessage } from './chat-message';
import { ChatLoading } from '../ui/chat-loading';
import { ChatSuggestions } from '../ui/chat-suggestions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
}

export function ChatMessages({ messages, isLoading, onSuggestionClick }: ChatMessagesProps) {
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
    <div className="flex flex-col gap-6 container">
      {messages.map((msg, idx) => {
        const isAssistant = msg.role === 'assistant';
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex ${isAssistant ? 'flex-col gap-2.5' : 'justify-end'}`}
          >
            {/* {isAssistant && (
              <div className="flex items-center gap-2">
                <AssistantAvatar size="sm" />
                <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wide uppercase">
                  Assistant
                </span>
              </div>
            )} i'll improve this shit later */}
            <div className={isAssistant ? '' : ''}>
              <ChatMessage message={msg} />
            </div>
          </motion.div>
        );
      })}

      {showSuggestions && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="pl-6"
        >
          <ChatSuggestions onSuggestionClick={onSuggestionClick} />
        </motion.div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-2.5">
          <div className="">
            <ChatLoading />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
