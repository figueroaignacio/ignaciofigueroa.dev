import { GitHubIcon } from '@/shared/components/tech-icons';
import { ContactForm } from '@/features/contact/components/contact-form';
import { BASE_URL } from '@/shared/lib/constants';
import {
  ArrowUpRight01Icon,
  DiscordIcon,
  Linkedin01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { Metadata } from 'next';
import { type Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

const SOCIAL_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:contact@ignaciofigueroa.dev',
    icon: Mail01Icon,
    handle: 'contact@ignaciofigueroa.dev',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/figueroa-ignacio',
    icon: Linkedin01Icon,
    handle: '/in/figueroa-ignacio',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/figueroaignacio',
    icon: GitHubIcon,
    handle: '@figueroaignacio',
    external: true,
  },
  {
    id: 'discord',
    label: 'Discord',
    href: 'https://discord.com/users/ignaciofigueroa',
    icon: DiscordIcon,
    handle: 'ignaciofigueroa',
    external: true,
  },
];

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Ignacio Figueroa',
      url: `${BASE_URL}/${locale}`,
      jobTitle: 'Full Stack Developer',
      email: 'contact@ignaciofigueroa.dev',
      sameAs: ['https://github.com/figueroaignacio', 'https://linkedin.com/in/figueroa-ignacio'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageContent />
    </>
  );
}

async function ContactPageContent() {
  const t = await getTranslations('pages.contact');

  return (
    <div className="mb-20 space-y-16">
      <section className="space-y-4 pt-8" aria-labelledby="contact-page-title">
        <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
          {t('label')}
        </p>
        <h1 id="contact-page-title" className="text-2xl md:text-3xl font-heading font-semibold">
          {t('title')}
        </h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">{t('description')}</p>
      </section>
      <section className="space-y-6" aria-labelledby="contact-form-title">
        <div className="space-y-2">
          <h2
            id="contact-form-title"
            className="text-sm font-mono text-muted-foreground uppercase tracking-wider"
          >
            {t('formTitle')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('formDescription')}</p>
        </div>
        <ContactForm />
      </section>
      <section className="space-y-6" aria-labelledby="contact-links-title">
        <h2
          id="contact-links-title"
          className="text-sm font-mono text-muted-foreground uppercase tracking-wider"
        >
          {t('linksTitle')}
        </h2>
        <div className="grid gap-px border border-border rounded-lg overflow-hidden">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-4 px-5 py-4 bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                  aria-hidden="true"
                >
                  {typeof link.icon === 'function' ? (
                    <link.icon />
                  ) : (
                    <HugeiconsIcon icon={link.icon} className="size-5 shrink-0" />
                  )}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground">{link.handle}</span>
                </div>
              </div>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        es: `${BASE_URL}/es/contact`,
        'x-default': `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/contact`,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      siteName: 'Ignacio Figueroa',
      images: [
        {
          url: '/images/og-contact.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}
