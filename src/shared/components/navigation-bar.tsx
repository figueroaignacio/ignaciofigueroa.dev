'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { HeaderActions } from './header-actions';
import { Logo } from './logo';
import { OpenToWorkBadge } from './open-to-work-badge';

interface Navigation {
  label: string;
  href: string;
}

export function NavigationBar() {
  const t = useTranslations('ui');
  const navigation: Navigation[] = t.raw('navigation');
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex lg:justify-between lg:items-center sticky top-0 py-5 bg-background/30 backdrop-blur-sm z-100 container"
      aria-label="Main Navigation"
    >
      <Logo />
      <ul className="flex items-center space-x-5">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-block text-sm transition-all  ${
                  isActive
                    ? 'text-foreground font-medium scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-3">
        <OpenToWorkBadge />
        <HeaderActions />
      </div>
    </nav>
  );
}
