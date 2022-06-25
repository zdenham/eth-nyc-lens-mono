import { Container, HeadingProps, SlideFade, Text } from '@chakra-ui/react';
import React from 'react';

import { Heading } from './Heading';

// const Filled: React.FC<TextProps> = ({ children }) => (
//     <Text as='span' color='green'>{children}</Text>
// );

export const Hero: React.FC<HeadingProps> = () => (
    <SlideFade in offsetY='100px'>
        <Container maxWidth='90ch'>
            <Heading>Let Your Network Flourish</Heading>
            <Text>
                Enable Bluetooth discovery to effortlessly mass-follow your new IRL connections in an instant.
            </Text>
        </Container>
    </SlideFade>
);
