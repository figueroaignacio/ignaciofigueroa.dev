'use client';

import { GitHubIcon } from '@/shared/components/tech-icons';
import { DiscordIcon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form';

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
    <section id="contact" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <div className="max-w-2xl mb-12">
        <ContactForm />
      </div>

      <div className="space-y-4 pt-8 border-t border-border">
        <h3 className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">
          {tPages('linksTitle')}
        </h3>
        <div className="divide-y divide-border">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-4 py-4 hover:text-primary transition-colors duration-300"
            >
              <span className="text-[15px] font-mono text-foreground group-hover:text-primary transition-colors lowercase">
                {link.label}
              </span>
              <span className="text-[13px] font-mono text-muted-foreground group-hover:text-primary/80 transition-colors">
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
