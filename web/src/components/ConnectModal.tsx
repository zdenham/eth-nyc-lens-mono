/* eslint-disable max-len */
import {
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletButton } from './WalletButton';

export interface ConnectModalProps {
    readonly onClose: any;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ onClose }) => {
    const { data } = useAccount();
    const { connect: metamaskConnect } = useConnect({ connector: new MetaMaskConnector() });
    const { connect: walletConnectConnect } = useConnect({
        connector: new WalletConnectConnector({
            options: {
                qrcode: true
            }
        })
    });

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data]);

    const onClickMetaMask = useCallback(() => metamaskConnect(), []);
    const onClickWalletConnect = useCallback(() => walletConnectConnect(), []);

    return (
        <Modal isOpen onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt='50vh' transform='translateY(-50%) !important' rounded='20px'>
                <ModalHeader fontSize='20px'>Connect</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb='30px'>
                    <VStack spacing='20px'>
                        <WalletButton name='MetaMask' src='/wallets/metamask.png' onClick={onClickMetaMask} />
                        <WalletButton name='WalletConnect' src='/wallets/walletconnect.svg' onClick={onClickWalletConnect} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
