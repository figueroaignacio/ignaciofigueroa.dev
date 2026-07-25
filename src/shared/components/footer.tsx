import { useTranslations } from 'next-intl';

const footerLinks = [
  {
    label: 'pics',
    href: 'https://pics.ignaciofigueroa.dev',
  },
  {
    label: 'links',
    href: 'https://links.ignaciofigueroa.dev',
  },
];

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="container w-full mt-24 pb-12 pt-8 border-t border-border text-xs font-mono text-muted-foreground flex items-center justify-between flex-wrap gap-4">
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span>{t('components.footer.name').toLowerCase()}</span>
          <span>·</span>
          <span>buenos aires, ar</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <h4 className="text-sm font-bold">more links</h4>
          <div className="flex flex-col gap-y-4">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4"></div>
    </footer>
  );
}
