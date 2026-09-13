import { routing } from '@/i18n/routing';
import { Dock } from '@/shared/components/dock';
import { Footer } from '@/shared/components/footer';
import { Grain } from '@/shared/components/grain';
import { LocaleSwitcher } from '@/shared/components/locale-switcher';
import { LogoMark } from '@/shared/components/logo';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Link } from '@/i18n/navigation';
import { hasLocale, type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface ArticleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function ArticleLayout({ children, params }: ArticleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div id="app-shell" className="flex min-h-screen flex-col overflow-x-clip">
      <Grain />
      <div className="page-frame-outer flex flex-1 flex-col">
        <header className="page-frame">
          <div className="frame-column flex items-center justify-between gap-4 py-6">
            <Link href="/" className="group flex min-w-0 items-center gap-3">
              <LogoMark
                size={24}
                className="logo-mark shrink-0 text-foreground/70 transition-colors duration-300 group-hover:text-foreground"
              />
              <span className="truncate font-mono text-[11px] text-muted-foreground">
                {t('components.logo.tagline')}
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground">
              <ThemeToggle />
              <span className="select-none">·</span>
              <LocaleSwitcher />
            </div>
          </div>
        </header>
        <main id="main-content" className="page-frame flex flex-1 flex-col" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
      <Dock />
    </div>
  );
}
