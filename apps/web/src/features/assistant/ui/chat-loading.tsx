import { Timeline } from '@/shared/components/ui/timeline';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { ToolName } from '../lib/parse-stream';
import { AssistantCoding } from './assistant-coding';

interface ChatLoadingProps {
  activeTool?: ToolName | null;
}

type TraceStep = 'reading' | 'writing' | ToolName;

const STEP_TRANSITION = { duration: 0.25, ease: [0.16, 1, 0.3, 1] } as const;

export function ChatLoading({ activeTool }: ChatLoadingProps) {
  const t = useTranslations('components.chat.messages.trace');
  const [toolsUsed, setToolsUsed] = useState<ToolName[]>([]);

  useEffect(() => {
    if (!activeTool) return;
    setToolsUsed((prev) => (prev.includes(activeTool) ? prev : [...prev, activeTool]));
  }, [activeTool]);

  const steps: TraceStep[] = ['reading', ...toolsUsed];
  if (!activeTool && toolsUsed.length > 0) steps.push('writing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={STEP_TRANSITION}
      className="select-none"
      aria-live="polite"
    >
      <AssistantCoding className="mb-3 ml-px h-auto w-16" />

      <span className="type-label text-muted-foreground/70">{t('title')}</span>

      <Timeline value={steps.length} className="mt-3">
        {steps.map((step, index) => {
          const isCurrent = index === steps.length - 1;

          return (
            <Timeline.Item key={step} step={index + 1} className="ps-6 pb-2 last:pb-0">
              <Timeline.Indicator
                className={`size-2.5 border ${isCurrent ? 'animate-pulse ring-4 ring-primary/15' : ''}`}
              />
              <Timeline.Separator />
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={STEP_TRANSITION}
              >
                <Timeline.Content
                  className={`font-mono text-[11px] leading-relaxed tracking-wide ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground/60'
                  }`}
                >
                  {t(step)}
                </Timeline.Content>
              </motion.div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </motion.div>
  );
}
