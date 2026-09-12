import { LogoutButton } from '@/features/auth/ui/logout-button';
import { LogoMark } from '@/shared/components/logo';
import Link from 'next/link';
import { AdminNavLink } from './admin-nav-link';

const SECTIONS = [
  { href: '/admin', label: 'projects', exact: true },
  { href: '/admin/experiences', label: 'experience' },
  { href: '/admin/education', label: 'education' },
  { href: '/admin/testimonials', label: 'testimonials' },
  { href: '/admin/contributions', label: 'contributions' },
  { href: '/admin/taxonomy', label: 'taxonomy' },
  { href: '/admin/media', label: 'media' },
];

export function AdminHeader() {
  return (
    <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-baseline gap-2.5">
        <Link href="/admin" className="flex items-center gap-2 text-[15px] font-semibold">
          <LogoMark size={22} className="text-foreground/70" />
          <span className="tracking-tight">cms</span>
        </Link>
        <span className="type-label text-muted-foreground">/admin</span>
      </div>
      <nav className="flex flex-wrap items-center gap-1">
        {SECTIONS.map((section) => (
          <AdminNavLink key={section.href} href={section.href} exact={section.exact}>
            {section.label}
          </AdminNavLink>
        ))}
        <AdminNavLink href="/" exact>
          view site
        </AdminNavLink>
        <LogoutButton />
      </nav>
    </header>
  );
}
