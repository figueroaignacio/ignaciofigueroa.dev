import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
            {/*
             * The same pixel portrait the favicon uses, as a sign-off. Grayscale
             * at rest so it reads as part of the mono footer, in colour on hover
             * — the page ends with a face instead of one more line of type.
             */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/pixel-portrait.png"
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
                className="size-8 shrink-0 rounded-sm opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
              <div className="space-y-1">
                <p className="text-foreground/80">{t('components.footer.name').toLowerCase()}</p>
                <p>buenos aires, ar</p>
              </div>
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
