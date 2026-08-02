import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { File01Icon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export function ChatContactCards() {
  const t = useTranslations('sections.assistant.contact');
  const contacts = [
    {
      id: 'github',
      label: 'GitHub',
      icon: GitHubIcon,
      href: 'https://github.com/figueroaignacio',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin01Icon,
      href: 'https://www.linkedin.com/in/figueroa-ignacio',
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail01Icon,
      href: 'mailto:contact@ignaciofigueroa.dev',
    },
    {
      id: 'cv-en',
      label: 'CV (English)',
      icon: File01Icon,
      href: 'https://ignaciofigueroa.vercel.app/pdf/CV_Ignacio_Figueroa_Fullstack_Developer.pdf',
    },
    {
      id: 'cv-es',
      label: 'CV (Español)',
      icon: File01Icon,
      href: 'https://ignaciofigueroa.vercel.app/pdf/CV_Ignacio_Figueroa_Desarrollador_Fullstack.pdf',
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 mt-2">
      <h2 className="type-label text-muted-foreground">{t('title')}</h2>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{t('description')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-1">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border bg-card hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <div className="size-6 rounded-lg bg-secondary/40 border border-border/60 flex items-center justify-center shrink-0">
                {typeof Icon === 'function' ? (
                  <div className="size-4 shrink-0 flex items-center justify-center">
                    <Icon />
                  </div>
                ) : (
                  <HugeiconsIcon icon={Icon} className="size-4 shrink-0" />
                )}
              </div>
              <span className="text-xs font-mono">{contact.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
