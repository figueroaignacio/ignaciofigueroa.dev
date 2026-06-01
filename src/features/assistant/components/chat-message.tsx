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
    emailSuccessData,
    cleanContent,
  } = parseMessageContent(message.content);

  const contentBlocks = [
    cleanContent ? <ChatMarkdownContent key="text" content={cleanContent} /> : null,
    showProjects ? <ChatProjectCards key="projects" /> : null,
    showExperience ? <ChatExperienceCards key="experience" /> : null,
    showContact ? <ChatContactCards key="contact" /> : null,
    emailSending ? (
      <motion.div
        key="email-sending"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden w-full max-w-xs sm:max-w-sm rounded-2xl border border-border/40 bg-card/65 dark:bg-card/35 backdrop-blur-md px-4 py-3.5 shadow-sm mt-2 flex flex-col gap-2.5"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted-foreground/10 overflow-hidden">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center size-8 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <HugeiconsIcon icon={Loading02Icon} className="size-4 animate-spin" />
            <motion.span
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-xl bg-primary/20"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-foreground leading-normal tracking-wide">
              {t('emailSending')}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono leading-none mt-1 animate-pulse">
              &gt; resend.emails.send()
            </span>
          </div>
        </div>
      </motion.div>
    ) : null,
    emailSuccess ? (
      <motion.div
        key="email-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden w-full max-w-xs sm:max-w-sm rounded-2xl border border-emerald-500/25 dark:border-emerald-500/15 bg-emerald-500/5 dark:bg-emerald-500/2 px-4 py-4.5 shadow-sm mt-2 flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-1"
      >
        {/* Header success indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center size-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
            <HugeiconsIcon icon={Tick01Icon} className="size-4 stroke-[2.5]" />
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-xl bg-emerald-500/30"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 leading-normal tracking-wide">
              {t('emailSuccess')}
            </span>
            <span className="text-[10px] text-emerald-600/75 dark:text-emerald-500/70 font-mono leading-none mt-0.5">
              STATUS: 200 DELIVERED
            </span>
          </div>
        </div>

        {/* Sender details list */}
        {emailSuccessData && (
          <div className="flex flex-col gap-2 rounded-xl bg-card/45 dark:bg-card/25 border border-border/20 p-3 text-[11px] leading-relaxed">
            <div className="grid grid-cols-4 gap-1">
              <span className="font-mono text-muted-foreground font-semibold">FROM</span>
              <span className="col-span-3 text-foreground font-medium truncate">
                {emailSuccessData.name}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <span className="font-mono text-muted-foreground font-semibold">EMAIL</span>
              <span className="col-span-3 text-foreground font-medium truncate select-all">
                {emailSuccessData.email}
              </span>
            </div>
            <div className="border-t border-border/10 my-1" />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-muted-foreground font-semibold">MESSAGE</span>
              <p className="text-foreground/90 italic line-clamp-3 leading-normal pl-2 border-l border-border/40 select-text whitespace-pre-wrap">
                "{emailSuccessData.message}"
              </p>
            </div>
          </div>
        )}
      </motion.div>
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
