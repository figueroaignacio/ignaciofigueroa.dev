import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { parseMessageContent } from '../lib/parse-message';
import type { Message } from '../types';
import { ChatMarkdownContent } from '../ui/chat-markdown-content';
import { ChatContactCards } from './cards/chat-contact-cards';
import { ChatExperienceCards } from './cards/chat-experience-cards';
import { ChatPitchCard } from './cards/chat-pitch-card';
import { ChatProjectCards } from './cards/chat-project-cards';
import { ChatEmailStatus } from './chat-email-status';

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
    showPitch,
    pitchData,
    cleanContent,
  } = parseMessageContent(message.content);

  const contentBlocks = [
    cleanContent ? <ChatMarkdownContent key="text" content={cleanContent} /> : null,
    showProjects ? <ChatProjectCards key="projects" /> : null,
    showExperience ? <ChatExperienceCards key="experience" /> : null,
    showContact ? <ChatContactCards key="contact" /> : null,
    showPitch && pitchData ? <ChatPitchCard key="pitch" data={pitchData} /> : null,
    emailSending || emailSuccess || emailError ? (
      <ChatEmailStatus
        key="email-status"
        emailSending={emailSending}
        emailSuccess={emailSuccess}
        emailError={emailError}
        emailErrorMessage={emailErrorMessage}
        emailSuccessData={emailSuccessData}
      />
    ) : null,
  ].filter(Boolean);

  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className={`flex w-full min-w-0 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isUser ? (
        <div className="min-w-0 max-w-[88%] overflow-hidden rounded-sm border border-border bg-secondary/40 px-3.5 py-2">
          <p className="whitespace-pre-wrap wrap-break-word text-[13px] leading-relaxed text-foreground/90">
            {cleanContent}
          </p>
        </div>
      ) : (
        <div className="flex w-full min-w-0 flex-col space-y-6 text-sm">
          {contentBlocks.map((block, index) => (
            <Fragment key={index}>
              {block}
              {index < contentBlocks.length - 1 && <div className="border-t border-rule" />}
            </Fragment>
          ))}
        </div>
      )}
    </motion.div>
  );
}
