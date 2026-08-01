'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useChatExperience } from '../../hooks/use-chat-data';
import { ChatExperienceCard } from '../ui/chat-experience-card';

export function ChatExperienceCards() {
  const locale = useLocale();
  const { data: experiences, isLoading: loading } = useChatExperience();
  const t = useTranslations('sections.assistant.experience');

  if (loading) {
    return (
      <div className="space-y-6 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-30 rounded-xl bg-card border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">{t('title')}</h2>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{t('description')}</p>
      <ol className="relative space-y-0">
        <div className="absolute left-2.75 top-2 bottom-2 w-px bg-border" />

        {experiences.map((experience) => (
          <li key={experience.id} className="relative pl-10 pb-8 last:pb-0">
            <ChatExperienceCard experience={experience} locale={locale} />
          </li>
        ))}
      </ol>
    </div>
  );
}
