import { Archivo, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';

export const fontHeading = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  style: ['normal', 'italic'],
  preload: true,
});

export const fontSans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
});

export const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  preload: true,
});
