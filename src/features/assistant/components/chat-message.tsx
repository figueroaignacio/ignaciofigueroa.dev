import { Loading02Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { parseMessageContent } from '../lib/parse-message';
import type { Message } from '../types';
import { ChatContactCards } from './cards/chat-contact-cards';
import { ChatExperienceCards } from './cards/chat-experience-cards';
import { ChatProjectCards } from './cards/chat-project-cards';
import { ChatMarkdownContent } from './ui/chat-markdown-content';

interface ChatMessageProps {
  message: Message;
}

const MOTION_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export function ChatMessage({ message }: ChatMessageProps) {
  const t = useTranslations('components.chat.messages');
  const isUser = message.role === 'user';
  const {
    showProjects,
    showExperience,
    showContact,
    emailSending,
    emailSuccess,
    emailError,
    emailErrorMessage,
    cleanContent,
  } = parseMessageContent(message.content);

  const contentBlocks = [
    cleanContent ? <ChatMarkdownContent key="text" content={cleanContent} /> : null,
    showProjects ? <ChatProjectCards key="projects" /> : null,
    showExperience ? <ChatExperienceCards key="experience" /> : null,
    showContact ? <ChatContactCards key="contact" /> : null,
    emailSending ? (
      <div
        key="email-sending"
        className="flex items-center gap-2 text-muted-foreground mt-2 py-1 px-3 bg-muted/20 border border-border/40 rounded-lg max-w-fit"
      >
        <HugeiconsIcon icon={Loading02Icon} className="size-4 animate-spin text-primary" />
        <span className="text-xs font-semibold">{t('emailSending')}</span>
      </div>
    ) : null,
    emailSuccess ? (
      <div
        key="email-success"
        className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 mt-2 py-1.5 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg max-w-fit animate-in fade-in slide-in-from-top-1"
      >
        <HugeiconsIcon icon={Tick01Icon} className="size-4" />
        <span className="text-xs font-semibold">{t('emailSuccess')}</span>
      </div>
    ) : null,
    emailError ? (
      <div
        key="email-error"
        className="flex flex-col gap-1.5 mt-2 py-2 px-3 bg-destructive/10 border border-destructive/20 rounded-lg max-w-xs sm:max-w-sm animate-in fade-in slide-in-from-top-1 text-destructive"
      >
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-destructive flex items-center justify-center text-background text-[10px] font-bold shrink-0">
            !
          </div>
          <span className="text-xs font-semibold">{t('emailError')}</span>
        </div>
        {emailErrorMessage && (
          <span className="text-[11.5px] font-mono opacity-85 pl-6 break-all leading-normal">
            {emailErrorMessage}
          </span>
        )}
      </div>
    ) : null,
  ].filter(Boolean);

  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className={`flex w-full min-w-0 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isUser ? (
        <div className="min-w-0 max-w-full overflow-hidden bg-foreground text-background rounded-2xl rounded-br-xs px-4.5 py-2.5 shadow-sm border border-foreground/10">
          <p className="text-[13px] sm:text-sm font-medium whitespace-pre-wrap wrap-break-word leading-relaxed">
            {cleanContent}
          </p>
        </div>
      ) : (
        <div className="max-w-full flex flex-col space-y-8 text-sm">
          {contentBlocks.map((block, index) => (
            <Fragment key={index}>
              {block}
              {index < contentBlocks.length - 1 && (
                <div className="my-2 border-t border-border/20" />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </motion.div>
  );
}
