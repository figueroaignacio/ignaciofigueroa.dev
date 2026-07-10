'use client';

interface HeroActionsProps {
  chatLabel: string;
  cvLabel: string;
  cvUrl: string;
}

export function HeroActions({ chatLabel, cvLabel, cvUrl }: HeroActionsProps) {
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      <a
        href="https://github.com/figueroaignacio"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="GitHub"
      >
        github
      </a>
      <a
        href="https://linkedin.com/in/figueroa-ignacio"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="LinkedIn"
      >
        linkedin
      </a>
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={cvLabel}
      >
        resume
      </a>
      <button
        onClick={handleChatClick}
        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono text-xs"
        aria-label={chatLabel}
      >
        assistant
      </button>
    </div>
  );
}
