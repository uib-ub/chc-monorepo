import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";

import type { AppProps } from "next/app";
import * as React from "react";
import { ThemeProvider } from 'next-themes';
import { Merriweather_Sans } from '@next/font/google'

const merriweathersans = Merriweather_Sans({
  subsets: ['latin'],
  variable: '--font-merriweathersans',
  fallback: ['Helvetica', 'ui-sans-serif', 'sans-serif'],
  adjustFontFallback: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <style jsx global>
        {`
          :root {
            --font-merriweathersans: ${merriweathersans.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
