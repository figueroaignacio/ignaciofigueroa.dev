import { routing } from '@/i18n/routing';
import { Providers } from '@/shared/components/providers';
import { SkipLink } from '@/shared/components/ui/skip-link';
import { BASE_URL } from '@/shared/lib/constants';
import { fontHeading, fontLora, fontSans, fontSerif } from '@/shared/lib/fonts';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
      <body
        className={`${fontSans.variable} ${fontHeading.variable} ${fontSerif.variable} ${fontLora.variable} antialiased py-16`}
      >
        <NextIntlClientProvider>
          <Providers>
            <Analytics />
            <SpeedInsights />
            <SkipLink />
            {children}
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
    default: 'Ignacio Figueroa · Fullstack Developer',
    template: '%s | Ignacio Figueroa',
  },
  description:
    'Fullstack developer building production systems with React, Next.js, FastAPI, and Python. Open source contributor with 6+ shipped projects and real-world AI integrations.',
  applicationName: 'Ignacio Figueroa',
  keywords: [
    'Fullstack Developer',
    'Ignacio Figueroa',
    'React',
    'Next.js',
    'TypeScript',
    'FastAPI',
    'Python',
    'AI Integration',
    'NachUI',
    'Component Library',
    'Open Source',
    'Software Engineer',
    'Argentina',
    'Portfolio',
    'Linux',
    'Fedora',
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
    title: 'Ignacio Figueroa · Fullstack Developer',
    description:
      'Fullstack developer building production systems with React, Next.js, FastAPI, and Python. Open source contributor with real-world AI integrations.',
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

  const isEs = locale === 'es';

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
      title: isEs
        ? 'Ignacio Figueroa · Desarrollador Fullstack'
        : 'Ignacio Figueroa · Fullstack Developer',
      description: isEs
        ? 'Desarrollador fullstack con React, Next.js, FastAPI y Python. Contribuidor open source con más de 6 proyectos en producción e integraciones reales de IA.'
        : 'Fullstack developer building production systems with React, Next.js, FastAPI, and Python. Open source contributor with 6+ shipped projects and real-world AI integrations.',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      alternateLocale: isEs ? ['en_US'] : ['es_ES'],
      siteName: 'Ignacio Figueroa',
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Ignacio Figueroa · Fullstack Developer',
        },
      ],
    },
  };
}
