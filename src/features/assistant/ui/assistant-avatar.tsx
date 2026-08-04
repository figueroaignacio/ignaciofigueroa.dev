import clsx from 'clsx';

const SIZES = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-12',
} as const;

type AssistantAvatarProps = {
  size?: keyof typeof SIZES;
  className?: string;
};

export function AssistantAvatar({ size = 'md', className }: AssistantAvatarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Portfolio AI"
      className={clsx('overflow-visible', SIZES[size], className)}
    >
      <title>Portfolio AI</title>
      <path fill="#2C1810" d="M5 0h14v4H5ZM3 2h2v4H3Zm16 0h2v4h-2Z" />
      <path fill="#E8845A" d="M3 4h18v14H3Z" />
      <path fill="#D4704A" d="M1 7h2v6H1Zm20 0h2v6h-2Z" />
      <path fill="#E8845A" d="M9 18h6v2H9Z" />
      <path fill="#F5F0E8" d="M3 20h18v4H3ZM1 21h2v3H1Zm20 0h2v3h-2Z" />
      <rect
        x="5"
        y="8"
        width="5"
        height="5"
        fill="#2C1810"
        className="animate-blink"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <rect
        x="14"
        y="8"
        width="5"
        height="5"
        fill="#2C1810"
        className="animate-blink"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  );
}
