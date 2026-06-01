import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function ChatLoading() {
  const t = useTranslations('components.chat.messages');

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2.5 pl-1"
    >
      {/* Animated typing dots */}
      <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-muted/40 border border-border/30">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block size-1.5 rounded-full bg-muted-foreground/50"
            animate={{
              scaleY: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground/50 tracking-wide">{t('thinking')}</span>
    </motion.div>
  );
}
