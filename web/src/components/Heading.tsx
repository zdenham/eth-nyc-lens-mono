import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';
import React from 'react';

export const Heading: React.FC<HeadingProps> = (props) => (
    <ChakraHeading
        as='h1'
        textShadow='#2c7300 1px -1px 0px, #2c7300 -1px 1px 0px, #2c7300 1px 1px 0px, #2c7300 -1px -1px 0px;'
        color='white'
        fontSize='64px'
        {...props}
    />
);
