import { useTranslations } from 'next-intl';

export function OpenToWorkBadge() {
  const t = useTranslations('components');

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      {t('openToWorkBadge')}
    </span>
  );
}
