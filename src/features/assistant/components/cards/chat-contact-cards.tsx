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
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold underline">{t('title')}</h2>
      <p className="text-sm text-muted-foreground">{t('description')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border/40 bg-card/40 hover:bg-card hover:border-border text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {typeof Icon === 'function' ? (
                <Icon />
              ) : (
                <HugeiconsIcon icon={Icon} className="size-4 shrink-0" />
              )}
              <span className="text-xs font-medium">{contact.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
