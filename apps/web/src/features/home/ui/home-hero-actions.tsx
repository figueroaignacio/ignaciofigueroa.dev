'use client';

import { Button } from '@/shared/components/ui/button';
import { buttonVariants } from '@/shared/components/ui/button-variants';
import { cn } from '@/shared/lib/cn';

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
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {heroActions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'font-mono')}
          aria-label={action.ariaLabel}
        >
          {action.label}
        </a>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={handleChatClick}
        className="font-mono border-brand/55 hover:border-brand hover:bg-brand/10"
      >
        AI Assistant
      </Button>
    </div>
  );
}
