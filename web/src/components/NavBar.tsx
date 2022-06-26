import { Avatar, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { navBarHeight, pagePaddingX, zIndexes } from '../constants';
import { useProfile } from '../utils/lens';
import { ConnectWalletButton } from './ConnectWalletButton';

export const NavBar: React.FC = () => {
    const { push } = useRouter();
    const { data } = useAccount();
    const { profile } = useProfile();

    const goToApp = useCallback(() => push('/dashboard'), []);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <HStack
            position='fixed'
            w='100vw'
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
                    <Image src='/wordmark.svg' alt='Flourish logo' h='40px' />
                </a>
            </Link>
            {(mounted || null)
                && (data?.address ? (
                    <Button bg='transparent' _hover={{ bg: 'transparent', opacity: 0.7 }} onClick={goToApp}>
                        <HStack>
                            <Avatar
                                name={data.address}
                                src={profile?.imageUrl || '/user.svg'}
                                bg='white'
                                boxSize='32px'
                            />
                            <VStack alignItems='flex-start' spacing='4px'>
                                <Text as='span' fontSize='12px'>{profile?.handle}</Text>
                                <Text as='span' ml='4px' fontSize='10px' fontWeight={400}>
                                    {`${data.address.slice(0, 6)}...${data.address.slice(-4)}`}
                                </Text>
                            </VStack>
                        </HStack>
                    </Button>
                ) : (
                    <ConnectWalletButton />
                ))}
        </HStack>
    );
};
