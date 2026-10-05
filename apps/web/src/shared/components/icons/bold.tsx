import * as React from 'react';

export type BoldIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function BoldIcon({ size = 24, strokeWidth = 1.5, ...props }: BoldIconProps) {
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
      <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7V5Z" />
      <path d="M7 12h7a3.5 3.5 0 0 1 0 7H7v-7Z" />
    </svg>
  );
}
