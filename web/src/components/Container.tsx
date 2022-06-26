import { Flex, StackProps } from '@chakra-ui/react';
import React from 'react';
import { navBarHeight } from '../constants';

export const Container: React.FC<StackProps> = ({ children, ...otherProps }) => (
    <Flex flexDir='column' alignItems='center' minH={`calc(100vh - ${navBarHeight})`} pt='40px' {...otherProps}>
        {children}
    </Flex>
);
