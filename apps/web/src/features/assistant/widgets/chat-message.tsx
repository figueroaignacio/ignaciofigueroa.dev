import { Bubble } from '@/shared/components/ui/bubble';
import { Message as MessageRow } from '@/shared/components/ui/message';
import { Separator } from '@/shared/components/ui/separator';
import { motion } from 'motion/react';
import { Fragment } from 'react';
import { parseMessageContent } from '../lib/parse-message';
import type { Message } from '../types';
import { AssistantAvatar } from '../ui/assistant-avatar';
import { ChatMarkdownContent } from '../ui/chat-markdown-content';
import { ChatContactCards } from './cards/chat-contact-cards';
import { ChatExperienceCards } from './cards/chat-experience-cards';
import { ChatPitchCard } from './cards/chat-pitch-card';
import { ChatProjectCards } from './cards/chat-project-cards';
import { ChatEmailStatus } from './chat-email-status';

interface ChatMessageProps {
  message: Message;
}

const ENTER_INITIAL = { opacity: 0, y: 8 } as const;
const ENTER_ANIMATE = { opacity: 1, y: 0 } as const;
const ENTER_TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] } as const;

export function ChatMessage({ message }: ChatMessageProps) {
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

  if (isUser) {
    return (
      <motion.div initial={ENTER_INITIAL} animate={ENTER_ANIMATE} transition={ENTER_TRANSITION}>
        <MessageRow align="end">
          <MessageRow.Content className="max-w-[88%]">
            <Bubble variant="secondary" align="end" className="rounded-sm border border-border">
              <Bubble.Content className="text-[13px] text-foreground/90">
                {cleanContent}
              </Bubble.Content>
            </Bubble>
          </MessageRow.Content>
        </MessageRow>
      </motion.div>
    );
  }

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
    <motion.div initial={ENTER_INITIAL} animate={ENTER_ANIMATE} transition={ENTER_TRANSITION}>
      <MessageRow align="start" className="items-start">
        <MessageRow.Avatar className="self-start pt-1">
          <AssistantAvatar size="md" />
        </MessageRow.Avatar>
        <MessageRow.Content className="w-full max-w-full">
          <Bubble.Group className="gap-6">
            {contentBlocks.map((block, index) => (
              <Fragment key={index}>
                <Bubble variant="ghost" className="w-full">
                  <Bubble.Content className="whitespace-normal px-0 py-0">{block}</Bubble.Content>
                </Bubble>
                {index < contentBlocks.length - 1 && <Separator className="bg-rule" />}
              </Fragment>
            ))}
          </Bubble.Group>
        </MessageRow.Content>
      </MessageRow>
    </motion.div>
  );
}
