import { HStack, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { navBarHeight, pagePaddingX, zIndexes } from '../constants';

import { ConnectWalletButton } from './ConnectWalletButton';

export const NavBar: React.FC = () => (
    <HStack
        as='header'
        justifyContent='space-between'
        alignItems='center'
        top='0'
        shadow='lg'
        zIndex={zIndexes.navBar}
        height={navBarHeight}
        paddingX={pagePaddingX}
        spacing='10px'
        bg='white'
    >
        <Link href='/'>
            <a>
                <Image src='/wordmark.png' alt='Flourish logo' h='40px' />
            </a>
        </Link>
        <ConnectWalletButton />
    </HStack>
);
