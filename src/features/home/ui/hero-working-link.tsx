'use client';

import { Tooltip } from '@/shared/components/ui/tooltip';

interface HeroWorkingLinkProps {
  href: string;
  label: string;
  note: string;
}

export function HeroWorkingLink({ href, label, note }: HeroWorkingLinkProps) {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
        >
          {label} ↗
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content className="font-mono text-[11px]">{note} :D</Tooltip.Content>
    </Tooltip>
  );
}
