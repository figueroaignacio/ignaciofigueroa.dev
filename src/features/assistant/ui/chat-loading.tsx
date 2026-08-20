import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { ToolName } from '../lib/parse-stream';
import { AssistantCoding } from './assistant-coding';

interface ChatLoadingProps {
  activeTool?: ToolName | null;
}

/** Every step the trace can show: the two bookends plus one per backend tool. */
type TraceStep = 'reading' | 'writing' | ToolName;

/**
 * The wait, shown as the work it actually is.
 *
 * A spinner says "something is happening"; this says what. Steps accumulate as
 * the stream reports tools, so a tool call that takes three seconds reads as
 * progress instead of a stall. Geometry is the page's timeline — a hairline
 * spine with dots — so the assistant explains itself in the site's own voice.
 */
export function ChatLoading({ activeTool }: ChatLoadingProps) {
  const t = useTranslations('components.chat.messages.trace');
  const [toolsUsed, setToolsUsed] = useState<ToolName[]>([]);

  useEffect(() => {
    if (!activeTool) return;
    setToolsUsed((prev) => (prev.includes(activeTool) ? prev : [...prev, activeTool]));
  }, [activeTool]);

  /*
   * `reading` opens every trace; `writing` closes it once the tools are done
   * and text is on its way. The last entry is always the step in flight.
   */
  const steps: TraceStep[] = ['reading', ...toolsUsed];
  if (!activeTool && toolsUsed.length > 0) steps.push('writing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="select-none"
      aria-live="polite"
    >
      <AssistantCoding className="mb-3 ml-px h-auto w-16" />

      <span className="type-label text-muted-foreground/70">{t('title')}</span>

      <ol className="relative mt-3 ml-1 space-y-2 border-l border-border pl-4">
        <AnimatePresence initial={false}>
          {steps.map((step, index) => {
            const isCurrent = index === steps.length - 1;

            return (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span
                  aria-hidden
                  className={`absolute top-[5px] left-[-20.5px] size-[7px] rounded-full border ${
                    isCurrent
                      ? 'animate-pulse border-brand bg-brand ring-4 ring-brand/15'
                      : 'border-border bg-background'
                  }`}
                />
                <span
                  className={`font-mono text-[11px] leading-relaxed tracking-wide ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground/60'
                  }`}
                >
                  {t(step)}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </motion.div>
  );
}
