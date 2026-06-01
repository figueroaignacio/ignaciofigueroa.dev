import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function ChatLoading() {
  const t = useTranslations('components.chat.messages');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 pl-1"
    >
      {/* Animated typing dots */}
      <div className="flex items-center gap-1.5 px-3 py-3 rounded-2xl bg-card/65 dark:bg-card/35 border border-border/40 backdrop-blur-md shadow-xs">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block size-2 rounded-full bg-[#E8845A]"
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.15, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-[11px] font-semibold text-muted-foreground/45 tracking-wider uppercase">{t('thinking')}</span>
    </motion.div>
  );
}
