import { routing } from '@/i18n/routing';
import { ConsoleGreeting } from '@/shared/components/console-greeting';
import { Dock } from '@/shared/components/dock';
import { Footer } from '@/shared/components/footer';
import { LogoMark } from '@/shared/components/logo';
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
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <div className="page-frame-outer flex flex-1 flex-col">
        <main id="main-content" className="page-frame relative flex-1" tabIndex={-1}>
          {/*
           * Corner mark, not a header: it's absolute, so it scrolls away with
           * the top of the page. Offset by --frame-pad so it lines up with the
           * frame's inner edge — including when the docked chat moves that edge.
           * Desktop only: on a phone the frame has no spare corner, and the
           * hover that explains it doesn't exist. The footer carries the same
           * line for everyone else.
           */}
          <div className="group absolute top-8 left-[var(--frame-pad)] hidden items-center gap-3 lg:flex">
            <LogoMark
              size={26}
              className="logo-mark shrink-0 text-foreground/70 transition-colors duration-300 group-hover:text-foreground"
            />
            <span className="inline-block max-w-0 overflow-hidden font-mono text-[11px] whitespace-nowrap text-muted-foreground opacity-0 transition-all duration-500 ease-out group-hover:max-w-md group-hover:opacity-100">
              {t('components.logo.tagline')}
            </span>
          </div>
          {children}
        </main>
      </div>
      <Footer />
      <Dock />
      <ConsoleGreeting />
    </div>
  );
}
