import { ContactSection } from '@/features/home/ui/contact-section';
import { HeroCredits } from '@/features/home/ui/hero-credits';
import { HomeHero } from '@/features/home/ui/home-hero';
import { routing } from '@/i18n/routing';
import { ConsoleGreeting } from '@/shared/components/console-greeting';
import { Dock } from '@/shared/components/dock';
import { Grain } from '@/shared/components/grain';
import { SilkParallax } from '@/shared/components/silk-parallax';
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
      <Grain />
      <div className="page-frame-outer reveal-cover flex flex-1 flex-col">
        <div className="split-shell flex-1">
          <aside className="split-aside">
            <div className="hero-waves" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <SilkParallax />
            <HomeHero />
            <HeroCredits />
          </aside>
          <main id="main-content" className="split-main page-frame relative" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
      <div className="reveal">
        <ContactSection />
      </div>
      <Dock />
      <ConsoleGreeting />
    </div>
  );
}
