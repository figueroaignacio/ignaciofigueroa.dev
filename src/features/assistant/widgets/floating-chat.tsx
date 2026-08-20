'use client';

import { useChat } from '@/features/assistant/hooks/use-chat';
import { Dialog } from '@/shared/components/ui/dialog';
import { Cancel01Icon, Message01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AssistantAvatar } from '../ui/assistant-avatar';
import { ChatHero } from './chat-hero';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';

interface FloatingChatProps {
  onClose: () => void;
}

export function FloatingChat({ onClose }: FloatingChatProps) {
  const { messages, isLoading, activeTool, sendMessage, resetChat, isMounted } = useChat();
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
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <header className="flex items-center justify-between w-full px-4 py-3 shrink-0 safe-top relative border-b border-border">
        <div>
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
      <div className="flex-1 flex flex-col min-h-0 bg-background relative overflow-hidden">
        {showHero ? (
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0 p-4">
            <div className="flex-1 flex items-center justify-center">
              <ChatHero onQuickAction={handleQuickAction} typing={message.trim().length > 0} />
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
            <div className="flex-1 overflow-y-auto min-h-0 pt-4 pb-26">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                activeTool={activeTool}
                onSuggestionClick={handleQuickAction}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-4 pb-4 pt-10 bg-linear-to-t from-background via-background/85 to-transparent">
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
