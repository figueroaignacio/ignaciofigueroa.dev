'use client';

import { Section } from '@/shared/components/ui/section';
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

  return (
    <Section id="contact" title={t('title')}>
      <ContactForm />
      <div className="mt-12">
        <h3 className="type-label text-muted-foreground">{tPages('linksTitle')}</h3>
        <div className="divide-y divide-border">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-6 py-3.5 first:pt-0 last:pb-0 hover:text-brand transition-colors duration-300"
            >
              <div className="min-w-0">
                <span className="block text-[14px] font-mono text-foreground group-hover:text-brand transition-colors lowercase">
                  {link.label}
                </span>
                <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {tPages(`links.${link.id}`)}
                </span>
              </div>
              <span className="shrink-0 text-xs font-mono text-muted-foreground group-hover:text-brand/70 transition-colors">
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
