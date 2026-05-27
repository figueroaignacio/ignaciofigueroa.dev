'use client';

import { useTheme } from 'nach-themes';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const t = useTranslations('components.theme');
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-4 w-12 animate-pulse rounded bg-muted/50" />;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-muted-foreground focus:outline-hidden hover:underline"
      aria-label="Toggle theme"
    >
      {isDark ? t('light') : t('dark')}
    </button>
  );
}
