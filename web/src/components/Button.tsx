import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const Button: React.FC<ButtonProps> = (props) => (
    <ChakraButton
        position='relative'
        top='0'
        fontFamily='Poppins, sans-serif'
        color='white'
        size='md'
        rounded='full'
        shadow='glow'
        py='8px'
        px='24px'
        bg='green'
        fontSize='14px'
        _hover={{ top: '-4px', boxShadow: 'none' }}
        {...props}
    />
);
