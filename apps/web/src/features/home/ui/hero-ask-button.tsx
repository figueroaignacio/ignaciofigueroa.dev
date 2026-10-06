'use client';

import { AssistantAvatar } from '@/features/assistant/ui/assistant-avatar';
import { cn } from '@/shared/lib/cn';

interface HeroAskButtonProps {
  label: string;
  className?: string;
}

export function HeroAskButton({ label, className }: HeroAskButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-chat'))}
      className={cn('cursor-pointer', className)}
    >
      <span aria-hidden="true" className="flex shrink-0">
        <AssistantAvatar size="sm" className="scale-125" />
      </span>
      {label}
    </button>
  );
}
