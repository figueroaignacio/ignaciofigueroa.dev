import { routing } from '@/i18n/routing';
import { ConsoleGreeting } from '@/shared/components/console-greeting';
import { Dock } from '@/shared/components/dock';
import { Footer } from '@/shared/components/footer';
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
      <div className="page-frame-outer flex flex-1 flex-col">
        <main id="main-content" className="page-frame flex-1" tabIndex={-1}>
          {children}
        </main>
      </div>
      <Footer />
      <Dock />
      <ConsoleGreeting />
    </div>
  );
}
