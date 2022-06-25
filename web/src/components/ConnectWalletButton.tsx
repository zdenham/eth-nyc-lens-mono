import React from 'react';
import { useConnectWalletModal } from '../hooks/useConnectWalletModal';
import { Button } from './Button';

export const ConnectWalletButton = () => {
    const { onOpen } = useConnectWalletModal();

    return (
        <Button onClick={onOpen}>Connect wallet</Button>
    );
};
