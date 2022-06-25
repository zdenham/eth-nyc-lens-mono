import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import theme from '../theme';
import '../global.css';
import '@fontsource/poppins';
import { NavBar } from '../components/NavBar';

function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <NavBar />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default App;
