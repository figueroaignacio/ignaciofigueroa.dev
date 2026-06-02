'use client';

import { AssistantAvatar } from '@/features/assistant/components/ui/assistant-avatar';
import { DocumentCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function HomeHero() {
  const t = useTranslations('sections.home');
  const tCv = useTranslations('components.ctaCv');

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <section className="space-y-6 mt-10">
      <p className="text-sm text-muted-foreground">{t('greeting')}</p>
      <h1 className="text-5xl sm:text-6xl font-normal tracking-tight text-balance leading-[1.05]">
        {t('name')}
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
        <span className="text-foreground font-medium">{t('title')}</span>
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-2xl text-balance">
        {t('description')}
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button onClick={handleChatClick} className="btn btn-primary group">
          {t('actions.chatAssistant')}
          <div className="transition-transform duration-300 group-hover:scale-110">
            <AssistantAvatar size="sm" />
          </div>
        </button>
        <a
          href={tCv('url')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline hover:bg-muted/50 transition-all duration-300"
        >
          <HugeiconsIcon icon={DocumentCodeIcon} className="size-4" />
          {t('actions.viewCv')}
        </a>
      </div>
    </section>
  );
}
