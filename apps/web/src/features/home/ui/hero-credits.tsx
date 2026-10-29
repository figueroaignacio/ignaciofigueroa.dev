export function HeroCredits() {
  return (
    <p
      style={{ '--d': '480ms' } as React.CSSProperties}
      className="hero-rise flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground"
    >
      <span>powered by</span>
      <a
        href="https://nachui.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
      >
        NachUI
      </a>
    </p>
  );
}
