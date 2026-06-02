'use client';

import { useChat } from '@/features/assistant/hooks/use-chat';
import { Dialog } from '@/shared/components/ui/dialog';
import {
  Cancel01Icon,
  Maximize01Icon,
  Message01Icon,
  Minimize01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ChatHero } from './chat-hero';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { AssistantAvatar } from './ui/assistant-avatar';

interface FloatingChatProps {
  onClose: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function FloatingChat({ onClose, isExpanded = false, onToggleExpand }: FloatingChatProps) {
  const { messages, isLoading, sendMessage, resetChat, isMounted } = useChat();
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const t = useTranslations('components.chat');

  const handleSend = () => {
    if (message.trim()) {
      setHasInteracted(true);
      sendMessage(message);
      setMessage('');
    }
  };

  const handleQuickAction = (text: string) => {
    setHasInteracted(true);
    sendMessage(text);
  };

  const handleReset = () => {
    resetChat();
    setHasInteracted(false);
    setMessage('');
  };

  useEffect(() => {
    if (messages.length > 0) {
      setHasInteracted(true);
    }
  }, [messages.length]);

  if (!isMounted) return null;

  const showHero = !hasInteracted && messages.length === 0;

  return (
    <div className="flex flex-col w-full h-full bg-card/95 dark:bg-[#161718]/90 backdrop-blur-xl overflow-hidden">
      <header className="flex items-center justify-between w-full px-4.5 py-3.5 shrink-0 border-b border-border/40 bg-card/45 dark:bg-[#161718]/45 backdrop-blur-md safe-top">
        <div className="flex items-center gap-2.5">
          <div>
            <AssistantAvatar size="sm" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-card shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-bold text-foreground tracking-wider uppercase">
              {t('header.title')}
            </span>
            <span className="text-[9px] font-medium text-muted-foreground/50 mt-0.5 tracking-wide">
              Online · Ready to help
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Dialog>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="flex items-center justify-center size-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                  title={t('header.reset')}
                >
                  <HugeiconsIcon icon={Message01Icon} className="size-4" />
                </button>
              </Dialog.Trigger>
              <Dialog.Content className="bg-card" zIndex={11000050}>
                <Dialog.Header>
                  <Dialog.Title>{t('header.resetConfirmTitle')}</Dialog.Title>
                  <Dialog.Description>{t('header.resetConfirmDescription')}</Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <button className="btn btn-outline text-center">
                      {t('header.resetConfirmCancel')}
                    </button>
                  </Dialog.Close>
                  <button className="btn btn-primary text-center" onClick={handleReset}>
                    {t('header.resetConfirmAction')}
                  </button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          )}

          {onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="items-center justify-center size-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200 cursor-pointer hidden md:flex"
              aria-label={isExpanded ? 'Collapse' : 'Expand to full screen'}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <HugeiconsIcon
                icon={isExpanded ? Minimize01Icon : Maximize01Icon}
                className="size-4"
              />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 cursor-pointer"
            aria-label="Close chat"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col min-h-0 w-full">
        {showHero ? (
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0 p-4.5">
            <div className="flex-1 flex items-center justify-center">
              <ChatHero onQuickAction={handleQuickAction} />
            </div>
            <div className="w-full mt-4 shrink-0 pb-safe">
              <ChatInput
                message={message}
                isLoading={isLoading}
                onMessageChange={setMessage}
                onSubmit={handleSend}
                isHero={true}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto min-h-0 py-4.5 bg-gradient-to-b from-transparent to-muted-foreground/3">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                onSuggestionClick={handleQuickAction}
              />
            </div>
            <div className="shrink-0 px-0 pb-3 pt-1.5 border-t border-border/30 bg-card/45 dark:bg-[#161718]/45 backdrop-blur-md">
              <ChatInput
                message={message}
                isLoading={isLoading}
                onMessageChange={setMessage}
                onSubmit={handleSend}
                isHero={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
