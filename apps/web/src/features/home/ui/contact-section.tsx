'use client';

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

export function ContactSection() {
  const t = useTranslations('components.contactForm');
  const tPages = useTranslations('pages.contact');
  const email = SOCIAL_LINKS[0];
  const socials = SOCIAL_LINKS.slice(1);

  return (
    <section id="contact" className="contact-stage scroll-mt-12">
      <div className="hero-waves" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="relative flex w-full flex-col gap-7 lg:gap-9">
        <p className="type-label lowercase text-muted-foreground">
          <span aria-hidden="true" className="text-muted-foreground/60">
            ./
          </span>
          <ScrambleText text={tPages('label')} mode="in-view" />
        </p>
        <h2 className="max-w-[9em] text-[clamp(2.5rem,min(9vw,8vh),5.5rem)] leading-[0.88] font-extrabold tracking-[-0.055em] uppercase text-foreground">
          {t('title')}
        </h2>

        <div className="flex flex-col gap-8 border-t-2 border-foreground pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex max-w-[36rem] flex-col">
            <p className="text-lg leading-tight font-bold tracking-[-0.03em] text-pretty text-foreground sm:text-xl">
              {tPages('description')}
            </p>

            <a
              href={email.href}
              className="mt-6 font-mono text-base text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-brand hover:decoration-brand md:text-lg"
            >
              {email.handle}
            </a>

            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {socials.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {link.label.toLowerCase()} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-lg shrink-0 text-left">
            <p className="type-label mb-4 text-muted-foreground">{tPages('formTitle')}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
