'use client';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { Timeline } from '@/shared/components/ui/timeline';
import { useLocale, useTranslations } from 'next-intl';
import { useChatExperience } from '../../hooks/use-chat-data';
import { ChatExperienceCard } from '../../ui/chat-experience-card';

export function ChatExperienceCards() {
  const locale = useLocale();
  const { data: experiences, isLoading: loading } = useChatExperience();
  const t = useTranslations('sections.assistant.experience');

  if (loading) {
    return (
      <div className="mt-4 space-y-6">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-30 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!experiences || experiences.length === 0) return null;

  const currentStep = experiences.findIndex((experience) => experience.isCurrent) + 1;

  return (
    <div className="mt-4 space-y-3">
      <h2 className="type-label text-muted-foreground">{t('title')}</h2>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{t('description')}</p>
      <Timeline value={currentStep} className="mt-1">
        {experiences.map((experience, index) => (
          <ChatExperienceCard
            key={experience.id}
            experience={experience}
            locale={locale}
            step={index + 1}
          />
        ))}
      </Timeline>
    </div>
  );
}
