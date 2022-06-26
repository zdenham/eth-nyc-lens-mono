/* eslint-disable max-len */
import { Box, BoxProps, Heading as ChakraHeading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { footerHeight, pagePaddingX } from '../constants';

const valueProps: ValuePropProps[] = [{
    src: '/value-props/users.svg',
    title: 'Instant Connection',
    description: 'There’s no quicker way for groups of people to connect.'
}, {
    src: '/value-props/apps.svg',
    title: 'Powered by Lens',
    description: 'Connect on Lens to take your network outside of walled gardens.'
}, {
    src: '/value-props/exclamation.svg',
    title: 'Stay Safe',
    description: 'Remove the possibility of typos or malicious QR code scans.'
}];

interface ValuePropProps {
    readonly src: string;
    readonly title: string;
    readonly description: string;
}

const ValueProp: React.FC<ValuePropProps> = ({ src, title, description }) => (
    <VStack maxW='300px'>
        <HStack>
            <Image src={src} boxSize='24px' />
            <ChakraHeading as='h2' fontSize='16px'>{title}</ChakraHeading>
        </HStack>
        <Text>{description}</Text>
    </VStack>
);

export const ValueProps: React.FC<BoxProps> = (props) => (
    <Box px={pagePaddingX} mb={footerHeight} {...props}>
        <VStack justifyContent='space-evenly' alignItems='flex-start' spacing='40px'>
            {valueProps.map((valueProp) => <ValueProp key={valueProp.title} {...valueProp} />)}
        </VStack>
    </Box>
);
