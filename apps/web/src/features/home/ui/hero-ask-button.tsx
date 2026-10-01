'use client';

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
      {label} →
    </button>
  );
}
