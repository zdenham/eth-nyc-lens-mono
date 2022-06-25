import { StackProps, VStack } from '@chakra-ui/react';
import React from 'react';
import { navBarHeight } from '../constants';

export const Container: React.FC<StackProps> = ({ children }) => (
    <VStack justifyContent='space-between' minH={`calc(100vh - ${navBarHeight})`} pt='40px'>
        {children}
    </VStack>
);
