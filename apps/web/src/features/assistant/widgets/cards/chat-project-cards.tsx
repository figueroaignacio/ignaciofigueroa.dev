'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { useChatProjects } from '../../hooks/use-chat-data';
import { ChatProjectCard } from '../../ui/chat-project-card';

export function ChatProjectCards() {
  const { data: projects, isLoading: loading } = useChatProjects();
  const t = useTranslations('sections.assistant.projects');

  if (loading) {
    return (
      <div className="mt-4 flex flex-col gap-3">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-19 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-3">
      <h2 className="type-label text-muted-foreground">{t('title')}</h2>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{t('description')}</p>
      {projects.map((project) => (
        <ChatProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
