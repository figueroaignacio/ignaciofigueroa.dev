export function BackgroundDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
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
