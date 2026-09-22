import { Link } from '@/i18n/navigation';

const externalLinks = [
  { label: 'pics', href: 'https://pics.ignaciofigueroa.dev' },
  { label: 'links', href: 'https://links.ignaciofigueroa.dev' },
  { label: 'github', href: 'https://github.com/figueroaignacio' },
];

const linkClassName = 'hover:text-foreground transition-colors underline-offset-4 hover:underline';

export function HeroCredits() {
  return (
    <div className="aside-credits flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
      <p className="flex items-center gap-1.5">
        <span>powered by</span>
        <a
          href="https://nachui.tech"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-foreground/80 ${linkClassName}`}
        >
          NachUI
        </a>
      </p>
      <nav aria-label="links" className="flex items-center gap-4">
        <Link href="/projects" className={linkClassName}>
          projects
        </Link>
        {externalLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {link.label} ↗
          </a>
        ))}
      </nav>
    </div>
  );
}
