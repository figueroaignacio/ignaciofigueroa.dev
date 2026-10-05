'use client';

import {
  BookIcon,
  BriefcaseIcon,
  FolderIcon,
  GitMergeIcon,
  GlobeIcon,
  ImageIcon,
  QuoteIcon,
  TagIcon,
  type IconComponent,
} from '@/shared/components/icons';
import { LogoutButton } from '@/features/auth/ui/logout-button';
import { LogoMark } from '@/shared/components/logo';
import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarCounts {
  projects: number;
  experiences: number;
  education: number;
  testimonials: number;
  contributions: number;
  media: number;
}

interface AdminSidebarProps {
  email: string;
  counts: SidebarCounts;
}

const itemClass =
  'flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground';

interface NavItem {
  href: string;
  label: string;
  icon: IconComponent;
  count?: number;
  exact?: boolean;
}

export function AdminSidebar({ email, counts }: AdminSidebarProps) {
  const pathname = usePathname();

  const content: NavItem[] = [
    { href: '/admin', label: 'projects', icon: FolderIcon, count: counts.projects, exact: true },
    {
      href: '/admin/experiences',
      label: 'experience',
      icon: BriefcaseIcon,
      count: counts.experiences,
    },
    {
      href: '/admin/education',
      label: 'education',
      icon: BookIcon,
      count: counts.education,
    },
    {
      href: '/admin/testimonials',
      label: 'testimonials',
      icon: QuoteIcon,
      count: counts.testimonials,
    },
    {
      href: '/admin/contributions',
      label: 'contributions',
      icon: GitMergeIcon,
      count: counts.contributions,
    },
  ];

  const library: NavItem[] = [
    { href: '/admin/media', label: 'media', icon: ImageIcon, count: counts.media },
    { href: '/admin/taxonomy', label: 'taxonomy', icon: TagIcon },
  ];

  function renderItem({ href, label, icon: Icon, count, exact }: NavItem) {
    const active = exact ? pathname === href : pathname.startsWith(href);
    return (
      <li key={href}>
        <Link
          href={href}
          aria-current={active ? 'page' : undefined}
          className={cn(itemClass, 'justify-between')}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Icon size={15} strokeWidth={1.5} />
            <span className="truncate">{label}</span>
          </span>
          {count === undefined ? null : (
            <span className="font-mono text-[11px] tabular-nums opacity-60">{count}</span>
          )}
        </Link>
      </li>
    );
  }

  return (
    <aside className="bg-surface-muted border-border flex w-full shrink-0 flex-col gap-6 border-b px-4 py-5 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-b-0 md:py-6">
      <div className="flex items-baseline justify-between gap-2">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <LogoMark size={20} className="text-foreground/70" />
          cms
        </Link>
        <span className="type-label text-muted-foreground">/admin</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="type-label text-muted-foreground px-1">content</span>
        <ul className="flex flex-col gap-0.5">{content.map(renderItem)}</ul>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <span className="type-label text-muted-foreground px-1">library</span>
        <ul className="flex flex-col gap-0.5">{library.map(renderItem)}</ul>
      </div>

      <div className="border-border flex flex-col gap-3 border-t pt-4">
        <Link href="/" className={itemClass}>
          <GlobeIcon size={15} strokeWidth={1.5} />
          view site
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground truncate text-xs">{email}</span>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
