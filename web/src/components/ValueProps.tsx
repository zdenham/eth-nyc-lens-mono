/* eslint-disable max-len */
import { Box, BoxProps, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { pagePaddingX } from '../constants';

const valueProps: ValuePropProps[] = [{
    src: '/value-props/users.svg',
    description: 'A group of people that just met are forced to connect in pairwise fashion.'
}, {
    src: '/value-props/apps.svg',
    description: 'Each connection may have a different social media platform preference, e.g. Telegram, Twitter, Discord?'
}, {
    src: '/value-props/warning.svg',
    description: ' If usernames are typed, there could be typos.'
}, {
    src: '/value-props/id.svg',
    description: 'Use one ID everywhere and bring your network with you.'
}
];

interface ValuePropProps {
    readonly src: string;
    readonly description: string;
}

const ValueProp: React.FC<ValuePropProps> = ({ src, description }) => (
    <VStack maxW='200px'>
        <Image src={src} boxSize='24px' />
        <Text>{description}</Text>
    </VStack>
);

export const ValueProps: React.FC<BoxProps> = (props) => (
    <Box backdropFilter='blur(10px)' p='20px' border='1px solid gray.100' px={pagePaddingX} {...props}>
        <HStack spacing='20px' justifyContent='center' alignItems='flex-start'>
            {valueProps.map((valueProp) => <ValueProp {...valueProp} />)}
        </HStack>
    </Box>
);
