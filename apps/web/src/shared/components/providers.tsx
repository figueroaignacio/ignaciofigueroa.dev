'use client';

import { ThemeProvider } from 'nach-themes';
import { Toast } from './ui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange>
      <Toast.Provider>{children}</Toast.Provider>
    </ThemeProvider>
  );
}
