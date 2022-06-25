import { Container, Heading, HeadingProps, SlideFade, Text } from '@chakra-ui/react';
import React from 'react';

// const Filled: React.FC<TextProps> = ({ children }) => (
//     <Text as='span' color='green'>{children}</Text>
// );

export const Hero: React.FC<HeadingProps> = (props) => (
    <SlideFade in offsetY='100px'>
        <Container maxWidth='80ch'>
            <Heading
                as='h1'
                textShadow='#2c7300 1px -1px 0px, #2c7300 -1px 1px 0px, #2c7300 1px 1px 0px, #2c7300 -1px -1px 0px;'
                color='white'
                fontSize='64px'
                {...props}
            >
                Follow new IRL connections on Lens
            </Heading>
            <Text>
                Enable Bluetooth discovery to effortlessly mass-follow your new IRL connections in an instant.
            </Text>
        </Container>
    </SlideFade>
);
