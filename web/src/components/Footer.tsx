import { Flex, HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { footerHeight, pagePaddingX, zIndexes } from '../constants';

export const Footer = () => (
    <Flex
        flexDir={{ base: 'column', md: 'row' }}
        display='flex'
        position='fixed'
        justifyContent={{ base: 'center', md: 'space-between' }}
        alignItems={{ base: 'center', md: 'auto' }}
        bottom='0'
        w='100vw'
        px={pagePaddingX}
        py='10px'
        h={footerHeight}
        zIndex={zIndexes.footer}
        bg='gray.50'
        shadow='all'
    >
        <Text as='small' fontSize='10px'>Don’t have a&nbsp;
            <Image display='inline' verticalAlign='middle' src='/lens.svg' boxSize='32px' /> handle?&nbsp;
            <Link display='inline' href='https://claim.lens.xyz' textDecor='underline'>Claim one here!</Link>
        </Text>
        <HStack alignItems='center' spacing='4px' fontSize='10px' mt='6px'>
            <Text>Built for</Text>
            <Link href='https://nyc.ethglobal.com/' textDecor='underline' target='_blank'>ETHNewYork 2022</Link>
            <Link href='https://github.com/zdenham/eth-nyc-lens-mono' target='_blank' pl='8px' pb='4px'>
                <Image src='/github.svg' boxSize='18px' />
            </Link>
        </HStack>
    </Flex>
);
