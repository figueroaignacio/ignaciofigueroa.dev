import { HomeView } from '@/features/home/views/home-view';
import { BASE_URL } from '@/shared/lib/constants';
import { type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const isEs = locale === 'es';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ignacio Figueroa',
      url: BASE_URL,
      inLanguage: [isEs ? 'es-AR' : 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/${locale}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Ignacio Figueroa',
        alternateName: 'Nacho',
        url: `${BASE_URL}/${locale}`,
        image: `${BASE_URL}/images/photo-profile.webp`,
        jobTitle: isEs ? 'Desarrollador Fullstack' : 'Fullstack Developer',
        description: isEs
          ? 'Desarrollador fullstack con React, Next.js, FastAPI y Python. Contribuidor open source con más de 6 proyectos en producción e integraciones reales de IA.'
          : 'Fullstack developer building production systems with React, Next.js, FastAPI, and Python. Open source contributor with 6+ shipped projects and real-world AI integrations.',
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'FastAPI',
          'Python',
          'AI Integration',
          'LLM',
          'PostgreSQL',
          'Linux',
          'Tailwind CSS',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: isEs ? 'Universidad Tecnológica Nacional' : 'National Technological University',
          url: 'https://www.utn.edu.ar',
        },
        sameAs: ['https://github.com/figueroaignacio', 'https://linkedin.com/in/figueroa-ignacio'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: isEs
        ? 'Ignacio Figueroa · Desarrollador Fullstack'
        : 'Ignacio Figueroa · Fullstack Developer',
      url: `${BASE_URL}/${locale}`,
      inLanguage: isEs ? 'es-AR' : 'en',
      isPartOf: {
        '@type': 'WebSite',
        url: BASE_URL,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.space-y-6 > p'],
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView />
    </>
  );
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      siteName: 'Ignacio Figueroa',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Ignacio Figueroa | Full Stack Developer',
        },
      ],
    },
  };
}
