import { DM_Mono, Hanken_Grotesk } from 'next/font/google';

export const fontSans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  preload: true,
});

export const fontCode = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
  preload: false,
});
