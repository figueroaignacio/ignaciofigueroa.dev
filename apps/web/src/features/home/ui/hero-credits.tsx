export function HeroCredits() {
  return (
    <p className="aside-credits flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted-foreground">
      <span>powered by</span>
      <a
        href="https://nachui.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        NachUI
      </a>
    </p>
  );
}
