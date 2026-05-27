import { AboutContent } from '@/features/about/components/about-content';
import { BASE_URL } from '@/shared/lib/constants';
import { type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <AboutContent />;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.aboutMe' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        es: `${BASE_URL}/es/about`,
        'x-default': `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/about`,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      siteName: 'Ignacio Figueroa',
      images: [
        {
          url: '/images/og-about.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}
