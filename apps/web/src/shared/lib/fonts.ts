import { Geist, Geist_Mono } from 'next/font/google';

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
});

export const fontCode = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
});
