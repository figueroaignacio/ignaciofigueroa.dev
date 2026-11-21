import * as React from 'react';

export type HigoIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function HigoIcon({ size = 24, ...props }: HigoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M112 48L92 13.36L68 27.22L80 48C80 80 32 72 32 144A96 96 0 0 0 112 238.66ZM144 48H176C176 80 224 72 224 144A96 96 0 0 1 144 238.66V189.25A48 48 0 0 0 144 98.75Z" />
    </svg>
  );
}
