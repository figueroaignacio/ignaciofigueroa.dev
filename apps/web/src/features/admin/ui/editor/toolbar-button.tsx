'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';

interface ToolbarButtonProps {
  icon: IconSvgElement;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function ToolbarButton({ icon, label, active, disabled, onClick }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn('size-8 rounded-sm', active && 'bg-muted text-foreground')}
    >
      <HugeiconsIcon icon={icon} size={16} />
    </Button>
  );
}
