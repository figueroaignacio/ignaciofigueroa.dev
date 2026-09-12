import { GitHubIcon } from '@/shared/components/tech-icons/github-icon';
import { Card } from '@/shared/components/ui/card';
import { IconTile } from '@/shared/components/ui/icon-tile';
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
    <div className="mt-2 flex flex-col gap-3.5">
      <h2 className="type-label text-muted-foreground">{t('title')}</h2>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{t('description')}</p>

      <div className="mt-1 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Card className="flex-row items-center gap-3 rounded-xl px-3.5 py-3 group-hover:border-foreground/20">
                <IconTile variant="outline" tone="muted" size="xs" className="bg-secondary/40">
                  {typeof Icon === 'function' ? <Icon /> : <HugeiconsIcon icon={Icon} />}
                </IconTile>
                <span className="font-mono text-xs">{contact.label}</span>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
