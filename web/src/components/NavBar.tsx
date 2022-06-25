import { Avatar, Button, HStack, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { navBarHeight, pagePaddingX, zIndexes } from '../constants';
import { ConnectWalletButton } from './ConnectWalletButton';

export const NavBar: React.FC = () => {
    const { push } = useRouter();
    const account = useAccount({
        onSuccess(data) {
            console.log('Success from navbar', data);
        }
    });
    const { data } = account;

    const goToApp = useCallback(() => push('/dashboard'), []);

    return (
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
            bg='gray.50'
        >
            <Link href='/'>
                <a>
                    <Image src='/wordmark.png' alt='Flourish logo' h='40px' />
                </a>
            </Link>
            {data?.address ? (
                <HStack>
                    <Button bg='white' _hover={{ bg: 'white' }} onClick={goToApp}>
                        <Avatar name={data.address} src='/user.svg' bg='white' boxSize='24px' />
                        <Text as='span' ml='4px'>
                            {`${data.address.slice(0, 4)}...${data.address.slice(-4)}`}
                        </Text>
                    </Button>
                </HStack>
            ) : (
                <ConnectWalletButton />
            )}
        </HStack>
    );
};
