'use client';

import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  label: string;
  fallbackHref: string;
  className?: string;
}

export function BackButton({ label, fallbackHref, className }: BackButtonProps) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => setCanGoBack(window.history.length > 1), []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!canGoBack || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    router.back();
  }

  return (
    <Link
      href={fallbackHref}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-sm font-mono text-xs transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
