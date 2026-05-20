'use client';

import { Tabs } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';

export function ProjectsTabs({
  work,
  personal,
}: {
  work: React.ReactNode;
  personal: React.ReactNode;
}) {
  const t = useTranslations('sections.projects');
  return (
    <Tabs defaultValue="personal" variant="ghost">
      <Tabs.List>
        <Tabs.Trigger value="personal">{t('personal.tab')}</Tabs.Trigger>
        <Tabs.Trigger value="work">{t('work.tab')}</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="personal">{personal}</Tabs.Content>
      <Tabs.Content value="work">{work}</Tabs.Content>
    </Tabs>
  );
}
