import { cn } from '@/shared/lib/cn';

export function PixelMate({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn('inline-block size-3.5 shrink-0', className)}
    >
      <path d="M17 2h4v2h-4Zm-2 2h2v2h-2Zm-2 2h2v2h-2Z" />
      <path d="M8 8h8v2H8Z" />
      <path d="M6 10h12v8H6Z" />
      <path d="M8 18h8v2H8Z" />
      <path d="M9 20h6v2H9Z" />
    </svg>
  );
}
