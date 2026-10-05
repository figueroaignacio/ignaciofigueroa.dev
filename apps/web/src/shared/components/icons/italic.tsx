import * as React from 'react';

export type ItalicIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function ItalicIcon({ size = 24, strokeWidth = 1.5, ...props }: ItalicIconProps) {
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
      <path d="M10 5h8" />
      <path d="M6 19h8" />
      <path d="M14 5 10 19" />
    </svg>
  );
}
