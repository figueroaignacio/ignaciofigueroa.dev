'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { AnimatedSectionHeader } from './animated-section-header';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function AboutSection() {
  const t = useTranslations('sections.aboutMe.content');
  const tSection = useTranslations('sections.aboutMe');

  return (
    <section id="about" className="space-y-6 scroll-mt-20">
      <AnimatedSectionHeader title={tSection('title')} description={tSection('description')} />

      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid gap-8 md:gap-12 items-start w-full">
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-base leading-relaxed text-muted-foreground"
            >
              <p className="">{t('bio')}</p>
              <p className="font-light italic text-muted-foreground">{t('details')}</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-2 pt-4 border-t border-border"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Focus
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                React • Next.js • TypeScript • Node.js • AI Integration • Clean Architecture • Linux
                • Fedora
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
