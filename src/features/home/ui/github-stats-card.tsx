import { Frame } from '@/shared/components/ui/frame';
import { IconTile } from '@/shared/components/ui/icon-tile';
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
    <Frame className="transition-all duration-300 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-sm">
      <Frame.Header className="flex-row items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        <IconTile size="xs" tone="muted" className="bg-secondary/40 border-border/60">
          <HugeiconsIcon icon={icon} />
        </IconTile>
      </Frame.Header>
      <Frame.Panel className="bg-background">
        <span className="text-xl font-semibold tracking-tight">{value}</span>
        {subtitle ? (
          <div className="text-[10px] text-muted-foreground font-normal mt-1">{subtitle}</div>
        ) : null}
      </Frame.Panel>
    </Frame>
  );
}
