'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Frame } from '@/shared/components/ui/frame';
import { IconTile } from '@/shared/components/ui/icon-tile';
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

function scoreVariant(score: number) {
  if (score >= 85) return 'success' as const;
  if (score >= 65) return 'warning' as const;
  return 'destructive' as const;
}

export function ChatPitchCard({ data }: ChatPitchCardProps) {
  const { match_score, role, company, pitch } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-3 w-full"
    >
      <Frame>
        <Frame.Header className="flex-row items-center justify-between gap-3 py-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <IconTile variant="soft" tone="primary" size="xs">
              <HugeiconsIcon icon={Briefcase01Icon} />
            </IconTile>
            <div className="flex min-w-0 flex-col gap-0.5">
              <Frame.Title className="truncate text-xs leading-tight">{role}</Frame.Title>
              <Frame.Description className="type-chip truncate leading-tight">
                {company}
              </Frame.Description>
            </div>
          </div>
          <Badge variant={scoreVariant(match_score)} className="shrink-0 font-mono">
            {match_score}%
          </Badge>
        </Frame.Header>
        <Frame.Panel className="px-3.5 py-3">
          <p className="text-sm leading-relaxed text-foreground/80">{pitch}</p>
        </Frame.Panel>
      </Frame>
    </motion.div>
  );
}
