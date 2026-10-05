import * as React from 'react';

export type BriefcaseIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function BriefcaseIcon({ size = 24, strokeWidth = 1.5, ...props }: BriefcaseIconProps) {
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
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3.5 12.5h17" />
    </svg>
  );
}
