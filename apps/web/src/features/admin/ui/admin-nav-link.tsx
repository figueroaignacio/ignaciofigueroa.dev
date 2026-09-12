'use client';

import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}

export function AdminNavLink({ href, exact, children }: AdminNavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'hover:bg-muted/50 flex h-8 items-center rounded-md px-3 font-mono text-xs transition-colors',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground',
      )}
    >
      {children}
    </Link>
  );
}
