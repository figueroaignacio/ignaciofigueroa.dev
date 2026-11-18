import * as React from 'react';

export type BoxIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function BoxIcon({ size = 24, strokeWidth = 1.5, ...props }: BoxIconProps) {
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
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M4 8l8 4.5L20 8" />
      <path d="M12 12.5v8" />
    </svg>
  );
}
