import { buttonVariants } from '@/shared/components/ui/button-variants';
import { cn } from '@/shared/lib/cn';
import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('ui');

  return (
    <a
      href="#main-content"
      className={cn(
        buttonVariants({ variant: 'default' }),
        'absolute left-4 top-4 z-100 -translate-y-20 transition-transform focus:translate-y-0',
      )}
    >
      {t('skipToContent')}
    </a>
  );
}
