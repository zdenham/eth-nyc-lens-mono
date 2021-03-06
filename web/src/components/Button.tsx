import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';

interface ButtonProps extends ChakraButtonProps {
    readonly kind?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ kind = 'primary', ...props }) => (
    <ChakraButton
        position='relative'
        top='0'
        fontFamily='Poppins, sans-serif'
        color={kind === 'primary' ? 'white' : 'green'}
        size='md'
        rounded='full'
        border={kind === 'primary' ? undefined : '2px solid green'}
        shadow={kind === 'primary' ? 'glow' : undefined}
        py='8px'
        px='24px'
        bg={kind === 'primary' ? 'green' : 'white'}
        fontSize='14px'
        _hover={{ top: props.disabled ? undefined : '-4px', boxShadow: props.disabled ? undefined : 'none' }}
        {...props}
    />
);
