import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";

import type { AppProps } from "next/app";
import * as React from "react";
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
