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
      <header className="flex items-center justify-between w-full px-4.5 py-3.5 shrink-0 border-b border-border/40 bg-card/45 dark:bg-[#161718]/45 backdrop-blur-md safe-top relative">
        <div className="flex items-center gap-2.5">
          <AssistantAvatar size="sm" />
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

      <div className="flex-1 flex flex-col min-h-0 w-full relative">
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
            <div className="flex-1 overflow-y-auto min-h-0 pt-4 pb-26 bg-linear-to-b from-transparent to-muted-foreground/3">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                onSuggestionClick={handleQuickAction}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-4 pb-5 pt-8 bg-gradient-to-t from-card via-card/95 to-transparent dark:from-[#161718] dark:via-[#161718]/95 dark:to-transparent">
              <div className="pointer-events-auto">
                <ChatInput
                  message={message}
                  isLoading={isLoading}
                  onMessageChange={setMessage}
                  onSubmit={handleSend}
                  isHero={false}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
