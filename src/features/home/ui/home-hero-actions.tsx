'use client';

interface HeroActionsProps {
  cvLabel: string;
  cvUrl: string;
}

export function HeroActions({ cvLabel, cvUrl }: HeroActionsProps) {
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-chat'));
  };

  const heroActions = [
    {
      label: 'GitHub',
      href: 'https://github.com/figueroaignacio',
      ariaLabel: 'GitHub',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/figueroa-ignacio',
      ariaLabel: 'LinkedIn',
    },
    {
      label: 'Resume',
      href: cvUrl,
      ariaLabel: cvLabel,
    },
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
      {heroActions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline text-xs"
          aria-label={action.ariaLabel}
        >
          {action.label}
        </a>
      ))}
      <button onClick={handleChatClick} className="btn btn-accent text-xs">
        AI Assistant
      </button>
    </div>
  );
}
