import { Link } from '@/i18n/navigation';
import { Dialog } from '@/shared/components/ui/dialog';
import { ArrowLeft01Icon, Message01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

interface ChatHeaderProps {
  onResetChat?: () => void;
}

export function ChatHeader({ onResetChat }: ChatHeaderProps) {
  const t = useTranslations('components.chat.header');

  return (
    <header className="z-40 flex items-center justify-between w-full px-5 py-4 border-b border-border/40 bg-card/65 dark:bg-[#161718]/65 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center justify-center size-8.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
        aria-label="Back"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
      </Link>

      {onResetChat && (
        <div className="flex items-center gap-1">
          <Dialog>
            <Dialog.Trigger asChild>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200 text-xs font-bold uppercase tracking-wider cursor-pointer"
                title={t('reset')}
              >
                <HugeiconsIcon icon={Message01Icon} size={13} />
                <span>{t('newChat')}</span>
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
