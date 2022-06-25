import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const Button: React.FC<ButtonProps> = (props) => (
    <ChakraButton
        position='relative'
        fontFamily='Poppins, sans-serif'
        color='green'
        size='xs'
        rounded='full'
        border='2px solid green'
        shadow='lg'
        p='8px'
        bg='white'
        _hover={{ shadow: 'xl', top: -2 }}
        {...props}
    >
        {props.children}
    </ChakraButton>
);
