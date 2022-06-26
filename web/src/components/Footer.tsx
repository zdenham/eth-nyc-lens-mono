import { HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { footerHeight, pagePaddingX, zIndexes } from '../constants';

export const Footer = () => (
    <HStack
        display='flex'
        position='fixed'
        justifyContent='space-between'
        bottom='0'
        w='100vw'
        px={pagePaddingX}
        py='10px'
        h={footerHeight}
        zIndex={zIndexes.footer}
        bg='gray.50'
        shadow='all'
    >
        <VStack spacing='0' alignItems='flex-start'>
            <Text as='small' fontSize='10px'>Don’t have a&nbsp;
                <Image display='inline' verticalAlign='middle' src='/lens.svg' boxSize='32px' /> handle?&nbsp;
                <Link display='inline' href='https://claim.lens.xyz' textDecor='underline'>Claim one here!</Link>
            </Text>
        </VStack>
        <HStack justifyContent='flex-end' spacing='4px'>
            <Text>Built for</Text>
            <Link href='https://nyc.ethglobal.com/' textDecor='underline' target='_blank'>ETHNewYork 2022</Link>
            <Link href='https://github.com/zdenham/eth-nyc-lens-mono' target='_blank' pl='8px'>
                <Image src='/github.svg' boxSize='18px' />
            </Link>
        </HStack>
    </HStack>
);
