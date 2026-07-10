import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="container w-full mt-24 pb-12 pt-8 border-t border-border text-xs font-mono text-muted-foreground flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span>{t('components.footer.name').toLowerCase()}</span>
        <span>·</span>
        <span>buenos aires, ar</span>
      </div>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
      </div>
    </footer>
  );
}
