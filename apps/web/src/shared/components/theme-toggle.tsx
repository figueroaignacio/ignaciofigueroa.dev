'use client';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'nach-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="size-9" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => setTheme(isDark ? 'light' : 'dark', e)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-muted-foreground hover:text-foreground"
    >
      <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} className="size-5" strokeWidth={1.5} />
    </Button>
  );
}
