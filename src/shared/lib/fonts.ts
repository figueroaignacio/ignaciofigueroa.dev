import { JetBrains_Mono, Source_Serif_4 } from 'next/font/google';

/**
 * Two families, deliberately. Source Serif 4 reads (headings + body),
 * JetBrains Mono structures (labels, chips, dates, nav, actions).
 */
export const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  preload: true,
});

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
});
