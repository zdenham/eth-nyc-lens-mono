import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import '@fontsource/poppins';
import { AppProps } from 'next/app';
import { useMemo } from 'react';
import { createClient, WagmiConfig } from 'wagmi';

import theme from '../theme';
import '../global.css';
import { NavBar } from '../components/NavBar';
import { ConnectWalletModalContext } from '../hooks/useConnectWalletModal';
import { ConnectModal } from '../components/ConnectModal';
import { Footer } from '../components/Footer';

const wagmiClient = createClient({ autoConnect: true });

function App({ Component, pageProps }: AppProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const connectWalletModalContextProviderValue = useMemo(
        () => ({ isOpen, onOpen, onClose }),
        [isOpen, onOpen, onClose]
    );

    return (
        <ChakraProvider resetCSS theme={theme}>
            <WagmiConfig client={wagmiClient}>
                <ConnectWalletModalContext.Provider value={connectWalletModalContextProviderValue}>
                    <NavBar />
                    <Component {...pageProps} />
                    <Footer />
                    {isOpen && <ConnectModal onClose={onClose} />}
                </ConnectWalletModalContext.Provider>
            </WagmiConfig>
        </ChakraProvider>
    );
}

export default App;
