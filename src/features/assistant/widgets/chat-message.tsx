import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { parseMessageContent } from '../lib/parse-message';
import type { Message } from '../types';
import { ChatContactCards } from './cards/chat-contact-cards';
import { ChatExperienceCards } from './cards/chat-experience-cards';
import { ChatPitchCard } from './cards/chat-pitch-card';
import { ChatProjectCards } from './cards/chat-project-cards';
import { ChatEmailStatus } from './chat-email-status';
import { ChatMarkdownContent } from '../ui/chat-markdown-content';

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
        <div className="max-w-[85%] overflow-hidden bg-secondary text-secondary-foreground border border-border/60 rounded-xl rounded-br-sm px-4 py-2.5">
          <p className="text-[13px] sm:text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
            {cleanContent}
          </p>
        </div>
      ) : (
        <div className="max-w-full flex flex-col space-y-8 text-sm">
          {contentBlocks.map((block, index) => (
            <Fragment key={index}>
              {block}
              {index < contentBlocks.length - 1 && <div className="my-2 border-t border-rule/50" />}
            </Fragment>
          ))}
        </div>
      )}
    </motion.div>
  );
}
