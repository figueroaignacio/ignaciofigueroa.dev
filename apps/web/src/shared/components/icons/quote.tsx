import * as React from 'react';

export type QuoteIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function QuoteIcon({ size = 24, strokeWidth = 1.5, ...props }: QuoteIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h5V7Z" />
      <path d="M10 12c0 3-1.5 4.5-4.5 5" />
      <path d="M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h5V7Z" />
      <path d="M19 12c0 3-1.5 4.5-4.5 5" />
    </svg>
  );
}
