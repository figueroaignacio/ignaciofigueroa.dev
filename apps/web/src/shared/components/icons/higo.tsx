import * as React from 'react';

const PATHS = {
  small:
    'M112 48L92 13.36L68 27.22L80 48C80 80 32 72 32 144A96 96 0 0 0 112 238.66ZM144 48H176C176 80 224 72 224 144A96 96 0 0 1 144 238.66V189.25A48 48 0 0 0 144 98.75Z',
  regular:
    'M120 40L105 14.02L90 22.68L100 40C98 84 42 80 42 150A86 86 0 0 0 120 235.63ZM136 40H156C158 84 214 80 214 150A86 86 0 0 1 136 235.63V207.45A58 58 0 0 0 136 92.55Z',
};

export const HIGO_HALVES = {
  left: 'M120 40L105 14.02L90 22.68L100 40C98 84 42 80 42 150A86 86 0 0 0 120 235.63Z',
  right: 'M136 40H156C158 84 214 80 214 150A86 86 0 0 1 136 235.63V207.45A58 58 0 0 0 136 92.55Z',
};

export type HigoIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  cut?: keyof typeof PATHS;
};

export function HigoIcon({ size = 24, cut = 'small', ...props }: HigoIconProps) {
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
      <path d={PATHS[cut]} />
    </svg>
  );
}
