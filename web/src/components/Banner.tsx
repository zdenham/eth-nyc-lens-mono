/* eslint-disable max-len */
import { Alert, AlertDescription, AlertIcon, AlertProps, HStack } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNetwork } from 'wagmi';
import { pagePaddingX } from '../constants';
import { Button } from './Button';

interface WarningBannerProps extends AlertProps {
    readonly buttonText: string;
    readonly buttonOnClick: () => void;
}

const WarningBanner: React.FC<WarningBannerProps> = ({ children, buttonText, buttonOnClick }) => (
    <Alert
        flexDir={{ base: 'column', md: 'row' }}
        status='warning'
        justifyContent='space-between'
        alignItems='center'
        px={pagePaddingX}
        mt='20px'
    >
        <HStack>
            <AlertIcon />
            <AlertDescription fontSize='12px' textAlign='left' lineHeight='1.2'>
                {children}
            </AlertDescription>
        </HStack>
        <Button
            flexShrink={0}
            kind='secondary'
            onClick={buttonOnClick}
            size='sm'
            bg='transparent'
            color='#ffab00'
            borderColor='#ffab00'
            ml='20px'
            shadow='glow-yellow'
            mt={{ base: '20px', md: '0' }}
        >
            {buttonText}
        </Button>
    </Alert>
);

export const Banner: React.FC = () => {
    const { activeChain, switchNetwork } = useNetwork();
    console.log(activeChain);

    const switchToMumbai = useCallback(() => switchNetwork(80001), [switchNetwork]);

    return (
        activeChain
        && activeChain.id !== 137 && (
            <WarningBanner buttonText='Switch Network' buttonOnClick={switchToMumbai}>
                <>
                    You’re connected to the <b>{activeChain.name}</b> network. Flourish is live on <b>Polygon</b>.
                </>
            </WarningBanner>
        )
    );
};
