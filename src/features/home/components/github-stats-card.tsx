import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import * as React from 'react';

interface GithubStatsCardProps {
  title: string;
  value: number | string;
  icon: IconSvgElement;
  subtitle?: React.ReactNode;
}

export function GithubStatsCard({ title, value, icon, subtitle }: GithubStatsCardProps) {
  return (
    <div className="flex flex-col p-4 rounded-xl border border-border/50 bg-secondary/15 transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        <div className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground">
          <HugeiconsIcon icon={icon} className="size-4" />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-semibold tracking-tight ">{value}</span>
        {subtitle ? (
          <div className="text-[10px] text-muted-foreground font-normal mt-1">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}
