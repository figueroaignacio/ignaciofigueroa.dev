import { Providers } from '@/shared/components/providers';
import { fontCode, fontSans } from '@/shared/lib/fonts';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: { default: 'cms', template: '%s · cms' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontCode.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
