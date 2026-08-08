import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';

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
    /*
     * No margin-top: this border is what closes the frame, so the rails have
     * to die on this exact line rather than trail off into empty space. The
     * rule spans the viewport; only the content sits on the column.
     */
    <footer className="w-full border-t border-rule text-xs font-mono text-muted-foreground">
      <div className="page-frame-outer">
        <div className="page-frame-flush">
          <div className="frame-column flex flex-wrap items-center justify-between gap-x-8 gap-y-6 pt-8 pb-12">
            <div className="space-y-1">
              <p className="text-foreground/80">{t('components.footer.name').toLowerCase()}</p>
              <p>buenos aires, ar</p>
            </div>
            <div className="flex items-center gap-5">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <span className="select-none">·</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
