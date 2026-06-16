import { routing } from '@/i18n/routing';
import { Providers } from '@/shared/components/providers';
import { SkipLink } from '@/shared/components/ui/skip-link';
import { TerminalPrompt } from '@/shared/components/ui/terminal-prompt';
import { BASE_URL } from '@/shared/lib/constants';
import { fontHeading, fontSans } from '@/shared/lib/fonts';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            <Analytics />
            <SkipLink />
            {children}
            <TerminalPrompt />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

const baseMetadata: Metadata = {
  title: {
    default: 'Ignacio Figueroa | Fullstack AI Developer',
    template: '%s | Ignacio Figueroa',
  },
  description:
    'Fullstack Developer building systems in React, FastAPI, and Python. No buzzwords, just clean code and functional AI integrations.',
  applicationName: 'Ignacio Figueroa',
  keywords: [
    'Fullstack Developer',
    'Ignacio Figueroa',
    'React Developer',
    'FastAPI Developer',
    'Python AI',
    'Portfolio',
    'Software Engineer',
  ],
  authors: [{ name: 'Ignacio Figueroa', url: BASE_URL }],
  creator: 'Ignacio Figueroa',
  publisher: 'Ignacio Figueroa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
    languages: {
      en: `${BASE_URL}/en`,
      es: `${BASE_URL}/es`,
      'x-default': `${BASE_URL}/en`,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ignacio Figueroa | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, and TypeScript.',
    creator: '@nachofiguer_oa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...baseMetadata,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title:
        locale === 'es'
          ? 'Ignacio Figueroa | Desarrollador Fullstack AI'
          : 'Ignacio Figueroa | Fullstack AI Developer',
      description:
        locale === 'es'
          ? 'Desarrollador Fullstack centrado en React, FastAPI y Python. Código directo sin rodeos ni buzzwords.'
          : 'Fullstack Developer working with React, FastAPI, and Python. Direct code, no buzzwords.',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_ES'],
      siteName: 'Ignacio Figueroa',
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: '/images/og-home.png',
          width: 1200,
          height: 630,
          alt: 'Ignacio Figueroa | Full Stack Developer',
        },
      ],
    },
  };
}
