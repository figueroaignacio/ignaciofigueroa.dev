'use client';

import { ActivityIcon } from '@hugeicons/core-free-icons';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { GithubContributionCalendar } from './github-contribution-calendar';
import { GithubStatsCard } from './github-stats-card';
import { GithubStatsClientProps } from './github-stats-types';
import { GithubYearTabs } from './github-year-tabs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export function GithubStatsClient({
  initialYear,
  availableYears,
  topLanguages,
  years,
}: GithubStatsClientProps) {
  const t = useTranslations('sections.github');
  const [activeYear, setActiveYear] = React.useState<string>(initialYear);
  const currentYearData = years[Number(activeYear)] || { totalContributions: 0, contributions: [] };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{t('description')}</p>
        <GithubYearTabs
          activeYear={activeYear}
          availableYears={availableYears}
          onChange={setActiveYear}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <GithubStatsCard
          title={`${t('stats.contributions')} (${activeYear})`}
          value={currentYearData.totalContributions.toLocaleString()}
          icon={ActivityIcon}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <GithubContributionCalendar
          activeYear={activeYear}
          contributions={currentYearData.contributions}
          topLanguages={topLanguages}
          titleText={t('title')}
          topLanguagesLabel={t('stats.topLanguages')}
          lessLabel={t('grid.less')}
          moreLabel={t('grid.more')}
        />
      </motion.div>
    </motion.div>
  );
}
