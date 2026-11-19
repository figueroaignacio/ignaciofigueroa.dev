import { routing } from '@/i18n/routing';
import { Dock } from '@/shared/components/dock';
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
      <div className="page-frame-outer flex flex-1 flex-col">
        <header className="page-frame">
          <div className="frame-column flex items-center justify-between gap-4 py-6">
            <Link
              href="/"
              className="text-[15px] font-medium tracking-[-0.015em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {t('sections.home.name')}
            </Link>
          </div>
        </header>
        <main id="main-content" className="page-frame flex flex-1 flex-col" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Dock />
    </div>
  );
}
