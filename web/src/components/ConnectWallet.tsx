import { Link, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';

export const ConnectWallet: React.FC<StackProps> = (props) => (
    <VStack justifyContent='center' {...props}>
        <ConnectWalletButton />
        <Text as='small'>
            Don’t have a Lens handle?&nbsp;
            <Link href='https://claim.lens.xyz' textDecor='underline'>Claim one here!</Link>
        </Text>
    </VStack>
);
