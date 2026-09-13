import { Button } from '@/shared/components/ui/button';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  meta?: string;
  newHref?: string;
  newLabel?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  eyebrow = 'content',
  title,
  meta,
  newHref,
  newLabel,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="border-border flex flex-wrap items-end justify-between gap-4 border-b pb-5">
      <div className="flex flex-col gap-1">
        <span className="type-label text-muted-foreground">{eyebrow}</span>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {meta ? <p className="text-muted-foreground text-[13px]">{meta}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {newHref ? (
          <Link href={newHref}>
            <Button leftIcon={<HugeiconsIcon icon={Add01Icon} size={14} />} tabIndex={-1}>
              {newLabel ?? 'new'}
            </Button>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
