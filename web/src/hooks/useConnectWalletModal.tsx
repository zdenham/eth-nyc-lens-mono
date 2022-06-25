import { createContext, useContext, } from 'react';

export const ConnectWalletModalContext = createContext({
    isOpen: false,
    onOpen: () => { },
    onClose: () => { }, // eslint-disable-line @typescript-eslint/no-unused-expressions
});

export const useConnectWalletModal = () => {
    const context = useContext(ConnectWalletModalContext);

    return context;
};
