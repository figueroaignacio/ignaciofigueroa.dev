'use client';

import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form';
import { GitHubIcon } from '@/shared/components/tech-icons';
import {
  ArrowUpRight01Icon,
  DiscordIcon,
  Linkedin01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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

export function ContactSection() {
  const t = useTranslations('components.contactForm');
  const tPages = useTranslations('pages.contact');

  return (
    <section id="contact" className="space-y-8 scroll-mt-20" aria-labelledby="contact-title">
      <div className="max-w-lg">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{t('title')}</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t('description')}</p>
        </div>
      </div>
      <div className="flex justify-start">
        <ContactForm />
      </div>

      <div className="space-y-4 pt-8 border-t border-border">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {tPages('linksTitle')}
        </h3>
        <div className="grid gap-px border border-border/60 rounded-2xl overflow-hidden sm:grid-cols-2 bg-border/40">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-4 px-5 py-4 bg-card hover:bg-secondary/60 transition-colors duration-300"
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
      </div>
    </section>
  );
}
