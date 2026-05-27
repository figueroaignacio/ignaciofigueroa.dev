import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('ui');

  return (
    <a
      href="#main-content"
      className="absolute left-4 top-4 z-100 -translate-y-20 px-4 py-2 transition-transform focus:translate-y-0 btn btn-primary"
    >
      {t('skipToContent')}
    </a>
  );
}
