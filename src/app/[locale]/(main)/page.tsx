import { ContactSection } from '@/features/contact/components/contact-section';
import { ContributionsSection } from '@/features/home/components/contributions-section';
import { CTACurriculum } from '@/features/home/components/cta-curriculum';
import { EducationSection } from '@/features/home/components/education-section';
import { ExperienceSection } from '@/features/home/components/experience-section';
import { HomeHero } from '@/features/home/components/home-hero';
import { NachUICta } from '@/features/home/components/nach-ui-cta';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { Testimonials } from '@/features/home/components/testimonials';
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Ignacio Figueroa',
      url: `${BASE_URL}/${locale}`,
      jobTitle: 'Full Stack Developer',
      sameAs: ['https://github.com/figueroaignacio', 'https://linkedin.com/in/figueroa-ignacio'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-24 mb-20">
        <HomeHero />
        <ProjectsSection />
        <ContributionsSection />
        <ExperienceSection />
        <NachUICta />
        <EducationSection />
        <Testimonials />
        <CTACurriculum />
        <ContactSection />
      </div>
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
          url: '/images/og-home.png',
          width: 1200,
          height: 630,
          alt: 'Ignacio Figueroa | Full Stack Developer',
        },
      ],
    },
  };
}
