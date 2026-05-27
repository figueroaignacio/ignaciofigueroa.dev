import { Separator } from '@/shared/components/ui/separator';
import { motion } from 'motion/react';
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
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const { showProjects, showExperience, showContact, cleanContent } = parseMessageContent(
    message.content,
  );

  const contentBlocks = [
    cleanContent ? <ChatMarkdownContent key="text" content={cleanContent} /> : null,
    showProjects ? <ChatProjectCards key="projects" /> : null,
    showExperience ? <ChatExperienceCards key="experience" /> : null,
    showContact ? <ChatContactCards key="contact" /> : null,
  ].filter(Boolean);

  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-full ${
          isUser ? 'bg-foreground text-background rounded-2xl rounded-br-sm px-4 py-2.5' : ''
        }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{cleanContent}</p>
        ) : (
          <div className="flex flex-col space-y-12">
            {contentBlocks.map((block, index) => (
              <Fragment key={index}>
                {block}
                {index < contentBlocks.length - 1 && <Separator label="o" />}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
