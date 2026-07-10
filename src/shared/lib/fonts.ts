import { JetBrains_Mono, DM_Sans, Playfair_Display, EB_Garamond, Lora } from 'next/font/google';

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

export const fontSerif = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  preload: true,
});

export const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  preload: true,
});

