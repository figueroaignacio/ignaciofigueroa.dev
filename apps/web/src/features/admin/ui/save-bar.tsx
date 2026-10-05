'use client';

import { ArrowLeftIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';
import { Kbd, KbdGroup } from '@/shared/components/ui/kbd';
import Link from 'next/link';

interface SaveBarProps {
  backHref: string;
  backLabel: string;
  savedAt: Date | null;
  saving: boolean;
  onSave: () => void;
  extra?: React.ReactNode;
}

export function SaveBar({ backHref, backLabel, savedAt, saving, onSave, extra }: SaveBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={backHref}
        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-[13px] font-medium transition-colors"
      >
        <ArrowLeftIcon size={16} />
        {backLabel}
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          {savedAt
            ? `saved ${savedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
            : 'not saved'}
          <KbdGroup>
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">s</Kbd>
          </KbdGroup>
        </span>
        {extra}
        <Button loading={saving} onClick={onSave}>
          save
        </Button>
      </div>
    </div>
  );
}
