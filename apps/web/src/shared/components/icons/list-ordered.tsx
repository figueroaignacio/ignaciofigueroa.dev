import * as React from 'react';

export type ListOrderedIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function ListOrderedIcon({ size = 24, strokeWidth = 1.5, ...props }: ListOrderedIconProps) {
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
      <path d="M10 6h10" />
      <path d="M10 12h10" />
      <path d="M10 18h10" />
      <path d="M4 5l1.5-1v5" />
      <path d="M4 15a1.5 1.5 0 0 1 3 .2c0 1.3-3 2.3-3 3.8h3" />
    </svg>
  );
}
