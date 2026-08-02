'use client';

import { useTranslations } from 'next-intl';
import { useChatProjects } from '../../hooks/use-chat-data';
import { ChatProjectCard } from '../ui/chat-project-card';

export function ChatProjectCards() {
  const { data: projects, isLoading: loading } = useChatProjects();
  const t = useTranslations('sections.assistant.projects');

  if (loading) {
    return (
      <div className="flex flex-col gap-3 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-19 rounded-xl bg-card border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="type-label text-muted-foreground">{t('title')}</h2>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{t('description')}</p>
      {projects.map((project) => (
        <ChatProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
