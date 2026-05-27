'use client';

import { Tooltip } from '@/shared/components/ui/tooltip';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AssistantAvatar } from './assistant-avatar';

export function ChatFloatingLink() {
  const t = useTranslations('components.chat.messages');
  const pathname = usePathname();

  if (pathname?.includes('/assistant')) return null;

  return (
    <div className="fixed bottom-2 right-2 z-50 hidden lg:block">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Link
            href="/assistant"
            className="hover:scale-[1.05] transition-transform active:scale-[0.95]"
          >
            <AssistantAvatar size="md" />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="text-sm">
          {t('tooltip')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
