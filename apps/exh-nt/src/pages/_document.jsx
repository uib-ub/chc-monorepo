import { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheetDocument } from 'next-sanity/studio'

// Set up SSR for styled-components, ensuring there's no missing CSS when deploying a Studio in Next.js into production
export default class Document extends ServerStyleSheetDocument {
  render() {
    return (
      // TODO: Functionality for setting writing direction based on language
      <Html lang="en" dir="ltr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
