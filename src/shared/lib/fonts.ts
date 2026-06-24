import { JetBrains_Mono } from 'next/font/google';

import { DM_Sans, Playfair_Display } from 'next/font/google';

export const fontHeading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
  preload: true,
});

export const fontSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
});
