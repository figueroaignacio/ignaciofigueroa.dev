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
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-1 container" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {/* Safe area spacer for fixed dock */}
      <div className="h-32 w-full shrink-0" aria-hidden="true" />
      <Dock />
    </div>
  );
}
