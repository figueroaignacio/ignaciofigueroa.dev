import { ContactSection } from '@/features/home/ui/contact-section';
import { HomeHero } from '@/features/home/ui/home-hero';
import { routing } from '@/i18n/routing';
import { ConsoleGreeting } from '@/shared/components/console-greeting';
import { Dock } from '@/shared/components/dock';
import { RevealObserver } from '@/shared/components/reveal-observer';
import { hasLocale, type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
  const t = await getTranslations();

  return (
    <div id="app-shell" className="min-h-screen flex flex-col overflow-x-clip">
      <div className="reveal-cover flex flex-1 flex-col">
        <main id="main-content" className="split-main page-frame flex-1" tabIndex={-1}>
          <HomeHero />
          {children}
        </main>
      </div>
      <div className="reveal">
        <ContactSection />
      </div>
      <Dock />
      <ConsoleGreeting />
      <RevealObserver />
    </div>
  );
}
