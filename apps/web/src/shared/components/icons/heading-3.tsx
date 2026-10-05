import * as React from 'react';

export type Heading3IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function Heading3Icon({ size = 24, strokeWidth = 1.5, ...props }: Heading3IconProps) {
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
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M15.5 9h5l-3 3.5a2.5 2.5 0 1 1-2 4" />
    </svg>
  );
}
