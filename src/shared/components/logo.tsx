import type { SVGProps } from 'react';

const marks = (
  <>
    {/* The i's dot — classed so a hover can lift it off the stem. */}
    <rect className="logo-dot" x="9" y="10" width="6" height="6" rx="1" />
    <rect x="9" y="22" width="6" height="18" rx="1" />
    <rect x="27" y="8" width="6" height="32" rx="1" />
    <rect x="27" y="8" width="16" height="6" rx="1" />
    <rect x="5" y="22" width="38" height="6" rx="1" />
  </>
);

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  radius?: number;
}

export function Logo({ size = 40, radius = 14, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Ignacio Figueroa"
      {...props}
    >
      <rect width="64" height="64" rx={radius} fill="var(--background, #141414)" />
      <g transform="translate(8 8)" fill="var(--foreground, #ffffff)">
        {marks}
      </g>
    </svg>
  );
}

export function LogoMark({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label="Ignacio Figueroa"
      {...props}
    >
      <g fill="currentColor">{marks}</g>
    </svg>
  );
}
