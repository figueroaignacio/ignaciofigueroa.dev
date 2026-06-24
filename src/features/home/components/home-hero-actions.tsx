'use client';

import { AssistantAvatar } from '@/features/assistant/components/ui/assistant-avatar';
import { DocumentCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface HeroActionsProps {
  chatLabel: string;
  cvLabel: string;
  cvUrl: string;
}

export function HeroActions({ chatLabel, cvLabel, cvUrl }: HeroActionsProps) {
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button onClick={handleChatClick} className="btn btn-primary group">
        {chatLabel}
        <div className="transition-transform duration-300 group-hover:scale-110">
          <AssistantAvatar size="sm" />
        </div>
      </button>
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline hover:bg-muted/50 transition-all duration-300"
      >
        <HugeiconsIcon icon={DocumentCodeIcon} className="size-4" />
        {cvLabel}
      </a>
    </div>
  );
}
