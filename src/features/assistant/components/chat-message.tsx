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
  initial: { opacity: 0, y: 10 },
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
      className={`flex w-full min-w-0 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isUser ? (
        <div className="min-w-0 max-w-[82%] overflow-hidden bg-gradient-to-br from-[#E8845A] to-[#D4704A] text-white rounded-2xl rounded-br-xs px-4 py-2.5 shadow-sm shadow-[#E8845A]/10 border border-[#E8845A]/10">
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
