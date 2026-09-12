import { HomeView } from '@/features/home/views/home-view';
import { BASE_URL } from '@/shared/lib/constants';
import { getContentFreshness } from '@/shared/lib/content-freshness';
import {
  buildPersonNode,
  buildWebPageNode,
  buildWebSiteNode,
  jsonLdGraph,
  PERSON_ID,
  type CredentialInput,
} from '@/shared/lib/schema';
import { type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tMeta, tSections, freshness] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.home' }),
    getTranslations({ locale, namespace: 'sections' }),
    getContentFreshness(locale),
  ]);

  const url = `${BASE_URL}/${locale}`;
  const credentials = tSections.raw('certifications.items') as CredentialInput[];
  const education = tSections.raw('education.items') as { institution: string }[];

  const jsonLd = jsonLdGraph([
    buildWebSiteNode(locale),
    buildPersonNode({
      locale,
      jobTitle: tMeta('jobTitle'),
      description: tMeta('description'),
      university: education[0]?.institution ?? 'Universidad Tecnológica Nacional',
      credentials,
    }),
    buildWebPageNode({
      url,
      name: tMeta('ogTitle'),
      description: tMeta('description'),
      locale,
      type: 'ProfilePage',
      datePublished: freshness.firstPublished.toISOString(),
      dateModified: freshness.lastModified.toISOString(),
      extra: {
        mainEntity: { '@id': PERSON_ID },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.prose-reading > p'],
        },
      },
    }),
  ]);

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
      title: t('ogTitle'),
      description: t('description'),
      url: `/${locale}`,
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      siteName: 'Ignacio Figueroa',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
  };
}
