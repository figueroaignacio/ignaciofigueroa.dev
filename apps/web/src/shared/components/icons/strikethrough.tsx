import * as React from 'react';

export type StrikethroughIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function StrikethroughIcon({
  size = 24,
  strokeWidth = 1.5,
  ...props
}: StrikethroughIconProps) {
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
      <path d="M4 12h16" />
      <path d="M16.5 7.5C16 5.8 14.3 5 12 5 9.5 5 7.5 6.2 7.5 8.3c0 1.5 1 2.6 3 3.2" />
      <path d="M7.5 16.5c.5 1.7 2.2 2.5 4.5 2.5 2.5 0 4.5-1.2 4.5-3.3 0-.6-.1-1.2-.4-1.7" />
    </svg>
  );
}
