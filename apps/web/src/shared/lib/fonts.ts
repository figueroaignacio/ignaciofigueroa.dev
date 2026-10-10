import { IBM_Plex_Mono, Schibsted_Grotesk } from 'next/font/google';

export const fontSans = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
  preload: true,
});

export const fontCode = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
});
