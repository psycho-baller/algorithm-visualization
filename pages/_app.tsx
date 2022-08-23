import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'
import Head from 'next/head';

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
return (
  <ChakraProvider>
    {" "}
    {/*theme={{theme}}*/}
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HashMap Visualization</title>

        <meta name="description" content="Visualizes a HashMap and how it gets populated and modified with the user's full control of the Hashmap" />
        <link
          rel="icon"
          href="https://cdn3.iconfinder.com/data/icons/elastic-search-blackfill/128/Elastic_Search_-_Black_Fill-16-1024.png"
        />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
);}

export default MyApp