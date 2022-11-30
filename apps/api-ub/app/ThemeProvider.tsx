'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: any) {
  return (
    <NextThemesProvider attribute="class">
      {children}
    </NextThemesProvider>
  );
}