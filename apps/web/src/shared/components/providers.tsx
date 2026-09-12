'use client';

import { ThemeProvider } from 'nach-themes';
import { SmoothScroll } from './smooth-scroll';
import { Toast } from './ui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange>
      <SmoothScroll />
      <Toast.Provider>{children}</Toast.Provider>
    </ThemeProvider>
  );
}
