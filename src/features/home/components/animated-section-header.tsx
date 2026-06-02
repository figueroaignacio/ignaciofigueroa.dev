'use client';

import { motion, type Variants } from 'motion/react';

interface AnimatedSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  id?: string;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export function AnimatedSectionHeader({
  title,
  description,
  className,
  id,
}: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={headerVariants}
      className={className}
    >
      <h2 id={id} className="text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
