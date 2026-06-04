'use client';

import { Briefcase01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';

interface PitchData {
  match_score: number;
  role: string;
  company: string;
  pitch: string;
}

interface ChatPitchCardProps {
  data: PitchData;
}

export function ChatPitchCard({ data }: ChatPitchCardProps) {
  const { match_score, role, company, pitch } = data;

  const scoreColor =
    match_score >= 85
      ? 'text-emerald-500 dark:text-emerald-400'
      : match_score >= 65
        ? 'text-amber-500 dark:text-amber-400'
        : 'text-rose-500 dark:text-rose-400';

  const scoreBorder =
    match_score >= 85
      ? 'border-emerald-500/20'
      : match_score >= 65
        ? 'border-amber-500/20'
        : 'border-rose-500/20';

  const scoreBg =
    match_score >= 85 ? 'bg-emerald-500/8' : match_score >= 65 ? 'bg-amber-500/8' : 'bg-rose-500/8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-2xl border border-border/40 bg-card/65 dark:bg-card/35 backdrop-blur-md overflow-hidden mt-3"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center size-7 rounded-lg bg-primary/10 text-primary shrink-0">
            <HugeiconsIcon icon={Briefcase01Icon} className="size-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-foreground truncate leading-tight">
              {role}
            </span>
            <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
              {company}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold shrink-0 ml-3 ${scoreColor} ${scoreBorder} ${scoreBg}`}
        >
          {match_score}%
        </div>
      </div>

      <p className="px-4 py-3.5 text-sm text-foreground/80 leading-relaxed">{pitch}</p>
    </motion.div>
  );
}
