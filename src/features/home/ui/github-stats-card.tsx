import { ItemCard } from '@/shared/components/ui/item-card';
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
    <ItemCard
      className="transition-all duration-300 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
      header={
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground font-medium">{title}</span>
          <div className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground">
            <HugeiconsIcon icon={icon} className="size-4" />
          </div>
        </div>
      }
    >
      <span className="text-xl font-semibold tracking-tight">{value}</span>
      {subtitle ? (
        <div className="text-[10px] text-muted-foreground font-normal mt-1">{subtitle}</div>
      ) : null}
    </ItemCard>
  );
}
