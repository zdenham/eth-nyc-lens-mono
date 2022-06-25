import { StackProps, VStack } from '@chakra-ui/react';
import React from 'react';
import { navBarHeight } from '../constants';

export const Container: React.FC<StackProps> = ({ children }) => (
    <VStack justifyContent='space-between' h={`calc(100vh - ${navBarHeight})`} py='40px'>
        {children}
    </VStack>
);
