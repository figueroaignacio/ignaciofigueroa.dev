import { GitHubIcon } from '@/components/tech-icons/github-icon';
import { Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

const contact = [
  {
    label: 'Email',
    href: 'mailto:contact@ignaciofigueroa.dev',
    icon: <HugeiconsIcon icon={Mail01Icon} />,
    target: '',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/figueroa-ignacio',
    icon: <HugeiconsIcon icon={Linkedin01Icon} />,
    target: '_blank',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/figueroaignacio',
    icon: <GitHubIcon />,
    target: '_blank',
  },
];

export function CTAContact() {
  const t = useTranslations('components.ctaContact');

  return (
    <section className="space-y-6">
      <div className=" space-y-2">
        <h2 className="text-xl font-semibold">{t('title')}</h2>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {contact.map((item) => (
          <a key={item.label} href={item.href} target={item.target} className="btn btn-outline">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
