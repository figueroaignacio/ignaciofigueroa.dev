import { Button } from '@/shared/components/ui/button';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

interface AdminPageHeaderProps {
  title: string;
  meta?: string;
  newHref?: string;
  newLabel?: string;
}

export function AdminPageHeader({ title, meta, newHref, newLabel }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-baseline gap-3">
        <h1 className="type-page-title text-foreground">{title}</h1>
        {meta ? <span className="text-muted-foreground font-mono text-xs">{meta}</span> : null}
      </div>
      {newHref ? (
        <Link href={newHref}>
          <Button leftIcon={<HugeiconsIcon icon={Add01Icon} size={14} />}>
            {newLabel ?? 'new'}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
