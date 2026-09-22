import { routing } from '@/i18n/routing';
import { Providers } from '@/shared/components/providers';
import { SkipLink } from '@/shared/components/ui/skip-link';
import { BASE_URL } from '@/shared/lib/constants';
import { fontCode, fontSans } from '@/shared/lib/fonts';
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
      <body className={`${fontSans.variable} ${fontCode.variable} antialiased`}>
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
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

const baseMetadata: Metadata = {
  title: {
    default: 'Ignacio Figueroa · Frontend Engineer',
    template: '%s · Ignacio Figueroa',
  },
  description:
    'Ignacio Figueroa is a frontend engineer in Buenos Aires, Argentina, working at Reclee, a B2B recruiting SaaS. He builds design systems with React and Next.js, writes his own backends in NestJS and maintains NachUI, an open source component system.',
  applicationName: 'Ignacio Figueroa',
  keywords: [
    'Frontend Engineer',
    'Ignacio Figueroa',
    'React',
    'Next.js',
    'TypeScript',
    'Design Systems',
    'NestJS',
    'PostgreSQL',
    'AI Integration',
    'Vercel AI SDK',
    'NachUI',
    'Component Library',
    'Open Source',
    'Buenos Aires',
    'Argentina',
    'Reclee',
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
    title: 'Ignacio Figueroa · Frontend Engineer',
    description:
      'Frontend engineer in Buenos Aires, Argentina. Design systems at Reclee and author of NachUI, an open source component system.',
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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
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
      title: 'Ignacio Figueroa · Frontend Engineer',
      description: isEs
        ? 'Ignacio Figueroa es frontend engineer en Buenos Aires, Argentina. Trabaja en Reclee, un SaaS B2B de reclutamiento, y es autor de NachUI, un sistema de componentes open source.'
        : 'Ignacio Figueroa is a frontend engineer in Buenos Aires, Argentina. He works at Reclee, a B2B recruiting SaaS, and is the author of NachUI, an open source component system.',
      type: 'website',
      locale: isEs ? 'es_AR' : 'en_US',
      alternateLocale: isEs ? ['en_US'] : ['es_AR'],
      siteName: 'Ignacio Figueroa',
      url: `${BASE_URL}/${locale}`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Ignacio Figueroa · Frontend Engineer',
        },
      ],
    },
  };
}
