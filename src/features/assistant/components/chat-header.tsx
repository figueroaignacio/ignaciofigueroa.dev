import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Dialog } from '@/shared/components/ui/dialog';
import { Link } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';
import { ArrowLeft01Icon, Message01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface ChatHeaderProps {
  onResetChat?: () => void;
}

export function ChatHeader({ onResetChat }: ChatHeaderProps) {
  const t = useTranslations('components.chat.header');

  return (
    <header className="z-40 flex items-center justify-between w-full px-5 py-3 border-b border-border/40">
      <Link
        href="/"
        className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors duration-150"
        aria-label="Back"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
      </Link>

      {onResetChat && (
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Dialog>
            <Dialog.Trigger asChild>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors duration-150 text-sm"
                title={t('reset')}
              >
                <HugeiconsIcon icon={Message01Icon} size={14} />
                <span className="text-xs">{t('newChat')}</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Content className="bg-card">
              <Dialog.Header>
                <Dialog.Title>{t('resetConfirmTitle')}</Dialog.Title>
                <Dialog.Description>{t('resetConfirmDescription')}</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <button className="btn btn-outline text-center">{t('resetConfirmCancel')}</button>
                </Dialog.Close>
                <button className="btn btn-primary text-center" onClick={onResetChat}>
                  {t('resetConfirmAction')}
                </button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      )}
    </header>
  );
}
