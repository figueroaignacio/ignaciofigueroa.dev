'use client';

import { type IconComponent } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';

interface ToolbarButtonProps {
  icon: IconComponent;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function ToolbarButton({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: ToolbarButtonProps) {
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
      <Icon size={16} />
    </Button>
  );
}
