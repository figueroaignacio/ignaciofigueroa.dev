import { Dock } from '@/shared/components/dock';
import { Footer } from '@/shared/components/footer';
import { routing } from '@/i18n/routing';
import { hasLocale, type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function MainLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/*
       * The frame is applied here and only here — one wrap for every route,
       * so the rails are continuous from the top of the page down to the
       * footer's rule. Never re-wrap this per page.
       */}
      <div className="page-frame-outer flex flex-1 flex-col">
        <main id="main-content" className="page-frame flex-1" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
      <Dock />
    </div>
  );
}
