import type { AppProps } from 'next/app'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'ui'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </React.StrictMode>
  )
}

export default App
