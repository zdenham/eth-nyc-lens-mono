import { Container, HeadingProps, SlideFade, Text } from '@chakra-ui/react';
import React from 'react';
import { Filled } from './Filled';

import { Heading } from './Heading';

export const Hero: React.FC<HeadingProps> = () => (
    <SlideFade in offsetY='100px'>
        <Container maxWidth='60ch'>
            <Heading>Let Your Network <Filled>Flourish</Filled></Heading>
            <Text mt='40px'>
                Connect with people you just met.
                Enable location-based discovery to effortlessly follow new connections in an instant on Lens.
            </Text>
        </Container>
    </SlideFade>
);
