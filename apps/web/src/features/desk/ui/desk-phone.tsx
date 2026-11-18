'use client';

import { ContactForm } from '@/features/home/ui/contact-form';
import { SOCIAL_LINKS } from '@/features/home/ui/contact-section';
import { useTranslations } from 'next-intl';
import { DeskObjectPanel } from './desk-object-panel';

export function DeskPhone({ path }: { path: string }) {
  const t = useTranslations('components.contactForm');
  const tPages = useTranslations('pages.contact');
  const tHome = useTranslations('sections.home');
  const [email, ...socials] = SOCIAL_LINKS;

  return (
    <DeskObjectPanel path={path} label={t('title')}>
      <div className="desk-object-body desk-contact">
        <section className="desk-island desk-contact-intro">
          <h2 className="desk-object-title">
            {t('title').replace(/\.$/, '')}
            <span aria-hidden="true" />
          </h2>
          <p className="text-base leading-normal text-pretty">{tPages('description')}</p>
          {email && (
            <a href={email.href} className="desk-card desk-row">
              {email.handle}
            </a>
          )}
          <span className="font-code text-xs text-muted-foreground">{tHome('status.city')}</span>
        </section>

        <div className="desk-phone">
          <span className="desk-phone-island" aria-hidden="true" />
          <div className="desk-phone-screen">
            <div className="desk-island px-4.5 py-4">
              <h3 className="text-xl font-bold tracking-[-0.025em]">{tPages('formTitle')}</h3>
            </div>
            <div className="desk-island p-4">
              <ContactForm compact />
            </div>
          </div>
        </div>

        <nav aria-label="Links" className="desk-island desk-contact-links">
          <span className="font-code px-1.5 pb-1.5 text-xs text-muted-foreground">./links</span>
          {socials.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="desk-card desk-row"
            >
              {link.label}
              <span className="font-code text-xs text-muted-foreground">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </DeskObjectPanel>
  );
}
