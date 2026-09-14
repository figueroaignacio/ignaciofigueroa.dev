import { PanelShow } from '@/features/assistant/ui/panel-show';
import { ContactSection } from '@/features/home/ui/contact-section';
import { HomeHero } from '@/features/home/ui/home-hero';
import { routing } from '@/i18n/routing';
import { ConsoleGreeting } from '@/shared/components/console-greeting';
import { Dock } from '@/shared/components/dock';
import { Footer } from '@/shared/components/footer';
import { Grain } from '@/shared/components/grain';
import { LocaleSwitcher } from '@/shared/components/locale-switcher';
import { LogoMark } from '@/shared/components/logo';
import { SilkParallax } from '@/shared/components/silk-parallax';
import { ThemeToggle } from '@/shared/components/theme-toggle';
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
            <div className="aside-head flex items-center justify-between gap-4">
              <div className="aside-brand group flex min-w-0 items-center gap-3">
                <LogoMark
                  size={26}
                  className="logo-mark shrink-0 text-foreground/70 transition-colors duration-300 group-hover:text-foreground"
                />
                <span className="aside-tagline inline-block max-w-0 overflow-hidden font-mono text-[11px] whitespace-nowrap text-muted-foreground opacity-0 transition-all duration-500 ease-out group-hover:max-w-md group-hover:opacity-100">
                  {t('components.logo.tagline')}
                </span>
              </div>
              <div className="aside-controls flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground">
                <ThemeToggle />
                <span className="select-none">·</span>
                <LocaleSwitcher />
              </div>
            </div>
            <HomeHero />
            <div className="panel-stage">
              <PanelShow />
            </div>
          </aside>
          <main id="main-content" className="split-main page-frame relative" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
      <div className="reveal">
        <ContactSection />
        <Footer />
      </div>
      <Dock />
      <ConsoleGreeting />
    </div>
  );
}
