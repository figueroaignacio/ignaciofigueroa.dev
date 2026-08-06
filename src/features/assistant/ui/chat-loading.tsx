import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { ToolName } from '../lib/parse-stream';

interface ChatLoadingProps {
  activeTool?: ToolName | null;
}

export function ChatLoading({ activeTool }: ChatLoadingProps) {
  const t = useTranslations('components.chat.messages');

  const label = activeTool ? t(`tools.${activeTool}`) : t('thinking');

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2.5 py-1.5 pl-1.5 type-chip text-muted-foreground select-none"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/35 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground/60" />
      </span>
      <motion.span
        key={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="tracking-widest uppercase"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
