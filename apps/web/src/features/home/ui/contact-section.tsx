'use client';

import { Link } from '@/i18n/navigation';
import { ScrambleText } from '@/shared/components/scramble-text';
import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form';

const SOCIAL_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:contact@ignaciofigueroa.dev',
    handle: 'contact@ignaciofigueroa.dev',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/figueroa-ignacio',
    handle: '/in/figueroa-ignacio',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/figueroaignacio',
    handle: 'github.com/figueroaignacio',
    external: true,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@ignaciofigueroa.dev',
    handle: '@ignaciofigueroa.dev',
    external: true,
  },
  {
    id: 'discord',
    label: 'Discord',
    href: 'https://discord.com/users/ignaciofigueroa',
    handle: 'ignaciofigueroa',
    external: true,
  },
];

const SITE_LINKS = [
  { label: 'pics', href: 'https://pics.ignaciofigueroa.dev' },
  { label: 'links', href: 'https://links.ignaciofigueroa.dev' },
];

const minorLink =
  'inline-flex min-h-11 items-center text-[15px] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline';

export function ContactSection() {
  const t = useTranslations('components.contactForm');
  const tPages = useTranslations('pages.contact');
  const email = SOCIAL_LINKS[0];
  const socials = SOCIAL_LINKS.slice(1);

  return (
    <section id="contact" className="contact-stage scroll-mt-12">
      <div className="relative flex w-full flex-col gap-10 lg:gap-14" data-reveal>
        <h2 className="type-hero text-[clamp(2.5rem,7vw,6rem)]">
          <ScrambleText text={t('title')} mode="in-view" />
        </h2>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex max-w-[36rem] flex-col">
            <p className="text-lg leading-snug font-semibold tracking-[-0.02em] text-pretty text-foreground">
              {tPages('description')}
            </p>

            <a
              href={email.href}
              className="mt-6 w-fit text-lg font-medium text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
            >
              {email.handle}
            </a>

            <ul className="mt-6 flex flex-wrap items-center gap-x-6">
              {socials.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={minorLink}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap items-center gap-x-6">
              <li>
                <Link href="/projects" className={minorLink}>
                  projects
                </Link>
              </li>
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={minorLink}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-lg shrink-0 rounded-2xl bg-background p-6 text-left sm:p-8">
            <h3 className="mb-6 text-lg font-semibold tracking-[-0.02em]">{tPages('formTitle')}</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
