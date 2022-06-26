import { Box, BoxProps, Flex, Heading, HStack, Image, ListItem, OrderedList, Text } from '@chakra-ui/react';
import React from 'react';
import { pagePaddingX } from '../constants';
import { Button } from './Button';
import { Profile, ProfileProps } from './Profile';

const dummyProfiles: ProfileProps[] = [{
    id: '1',
    address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
    imageUrl: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    id: '2',
    address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
    imageUrl: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    id: '3',
    address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
    imageUrl: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    id: '4',
    address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
    imageUrl: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}];

export const ProfileDiscovery: React.FC<BoxProps> = ({ ...otherProps }) => {
    return (
        <Box py='40px' px={pagePaddingX} {...otherProps}>
            <Heading as='h2' fontSize='16px'>Profile Discovery</Heading>
            <Text>Interact with a profile to toggle its selection. The button below will follow all selected profiles at once.</Text>
            <HStack mt='40px'>
                <Image src='/users.svg' boxSize='16px' />
                <Text color='gray.400'>4 profiles found</Text>
            </HStack>
            <OrderedList listStyleType='none' ml='0' borderX='2px solid' borderBottom='2px solid' borderColor='#ECECEC' shadow='lg'>
                {dummyProfiles.map((profile) => (
                    <ListItem key={profile.id} borderTop='2px solid' borderColor='#ECECEC'>
                        <Profile
                            {...profile}
                        />
                    </ListItem>
                ))}
            </OrderedList>
            <Flex justifyContent='center'>
                <Button mt='40px'>Follow Profiles</Button>
            </Flex>
        </Box>
    );
};
