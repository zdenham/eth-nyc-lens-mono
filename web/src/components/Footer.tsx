import { Box, HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { footerHeight, zIndexes } from '../constants';

export const Footer = () => (
    <Box
        position='fixed'
        bottom='0'
        w='100vw'
        py='10px'
        h={footerHeight}
        zIndex={zIndexes.footer}
        bg='gray.50'
        shadow='all'
    >
        <HStack w='100%' justifyContent='center' spacing='4px'>
            <Text>Built for</Text>
            <Link href='https://nyc.ethglobal.com/' textDecor='underline' target='_blank'>ETHNewYork 2022</Link>
            <Link href='https://github.com/zdenham/eth-nyc-lens-mono' target='_blank' pl='8px'>
                <Image src='/github.svg' boxSize='18px' />
            </Link>
        </HStack>
    </Box>
);
