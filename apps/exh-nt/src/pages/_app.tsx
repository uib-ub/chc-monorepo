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
  fallback: ['Helvetica', 'ui-sans-serif'],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className={`${merriweathersans.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
