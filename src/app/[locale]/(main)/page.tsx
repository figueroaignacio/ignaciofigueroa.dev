import { AboutSection } from '@/features/home/components/about-section';
import { ContactSection } from '@/features/home/components/contact-section';
import { ContributionsSection } from '@/features/home/components/contributions-section';
import { CTACurriculum } from '@/features/home/components/cta-curriculum';
import { EducationSection } from '@/features/home/components/education-section';
import { ExperienceSection } from '@/features/home/components/experience-section';
import { GithubStatsSection } from '@/features/home/components/github-stats-section';
import { HomeHero } from '@/features/home/components/home-hero';
import { Interests } from '@/features/home/components/interests';
import { NachUICta } from '@/features/home/components/nach-ui-cta';
import { ProjectsSection } from '@/features/home/components/projects-section';
import { TechStack } from '@/features/home/components/tech-stack';
import { Testimonials } from '@/features/home/components/testimonials';
import { WhoAmI } from '@/features/home/components/whoami';
import { BASE_URL } from '@/shared/lib/constants';
import { type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

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
        image: `${BASE_URL}/images/profile-photo.png`,
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
      <div className="space-y-14 mb-12">
        <HomeHero />
        <ProjectsSection />
        <AboutSection />
        <WhoAmI />
        <Suspense fallback={null}>
          <ContributionsSection />
        </Suspense>
        <Suspense fallback={null}>
          <GithubStatsSection />
        </Suspense>
        <TechStack />
        <Interests />
        <ExperienceSection />
        <NachUICta />
        <Suspense fallback={null}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
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
