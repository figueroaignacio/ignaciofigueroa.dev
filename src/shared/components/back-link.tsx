import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface BackLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function BackLink({ href, label, className }: BackLinkProps) {
  return (
    <Link
      href={href}
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
