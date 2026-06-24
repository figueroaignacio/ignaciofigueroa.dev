export function BackgroundDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      <div className="absolute top-0 right-[10%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/4 blur-[120px] mix-blend-screen opacity-70" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full bg-zinc-400/5 dark:bg-zinc-400/3 blur-[140px] mix-blend-screen opacity-60" />

      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 80px 80px, 80px 80px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
        }}
      />
    </div>
  );
}
