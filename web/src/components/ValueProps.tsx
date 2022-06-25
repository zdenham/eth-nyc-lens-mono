/* eslint-disable max-len */
import { Box, BoxProps, Heading as ChakraHeading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { footerHeight, pagePaddingX } from '../constants';
import { Filled } from './Filled';
import { Heading } from './Heading';

const valueProps: ValuePropProps[] = [{
    src: '/value-props/users.svg',
    title: 'Instant Connection',
    description: 'There’s no quicker way for groups of people to connect.'
}, {
    src: '/value-props/apps.svg',
    title: 'Powered by Lens',
    description: 'Connect on Lens to take your network outside of walled gardens.'
}, {
    src: '/value-props/exclamation.svg',
    title: 'Stay Safe',
    description: 'Remove the possibility of typos or malicious QR code scans.'
}];

interface ValuePropProps {
    readonly src: string;
    readonly title: string;
    readonly description: string;
}

const ValueProp: React.FC<ValuePropProps> = ({ src, title, description }) => (
    <VStack maxW='300px'>
        <Image src={src} boxSize='24px' />
        <ChakraHeading as='h2' fontSize='16px'>{title}</ChakraHeading>
        <Text>{description}</Text>
    </VStack>
);

export const ValueProps: React.FC<BoxProps> = (props) => (
    <Box px={pagePaddingX} py='100px' mt='-50px' bg='linear-gradient(white, #A7C395)' mb={footerHeight} {...props}>
        <Heading fontSize='32px'>Onboarding IRL to <Filled>Lens</Filled></Heading>
        <HStack mt='60px' justifyContent='space-evenly' alignItems='flex-start'>
            {valueProps.map((valueProp) => <ValueProp key={valueProp.title} {...valueProp} />)}
        </HStack>
    </Box>
);
