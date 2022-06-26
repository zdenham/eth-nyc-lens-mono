import { Box, BoxProps, Flex, Heading, HStack, Image, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { pagePaddingX } from '../constants';
import { Button } from './Button';
import { Profile } from './Profile';

// const dummyProfiles: ProfileProps[] = [
//     {
//         id: '1',
//         address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
//         imageUrl: '/dan.png',
//         name: 'Dan Abramov',
//         handle: '@dan.lens',
//         bio: 'lorem ipsum da da id est cum sum',
//     },
//     {
//         id: '2',
//         address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
//         imageUrl: '/dan.png',
//         name: 'Dan Abramov',
//         handle: '@dan.lens',
//         bio: 'lorem ipsum da da id est cum sum',
//     },
//     {
//         id: '3',
//         address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
//         imageUrl: '/dan.png',
//         name: 'Dan Abramov',
//         handle: '@dan.lens',
//         bio: 'lorem ipsum da da id est cum sum',
//     },
//     {
//         id: '4',
//         address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
//         imageUrl: '/dan.png',
//         name: 'Dan Abramov',
//         handle: '@dan.lens',
//         bio: 'lorem ipsum da da id est cum sum',
//     },
// ];

const dummyProfiles = [];

export const ProfileDiscovery: React.FC<BoxProps> = ({ ...otherProps }) => {
    const [ids, setIds] = useState(dummyProfiles.map((profile) => profile.id));

    return (
        <Box py='40px' px={pagePaddingX} {...otherProps}>
            <Heading as='h2' fontSize='16px'>
                Profile Discovery
            </Heading>
            <Text>
                Interact with a profile to toggle its selection. The button below will follow all selected profiles at
                once.
            </Text>
            {dummyProfiles.length > 0 && (
                <HStack mt='40px'>
                    <Image src='/users.svg' boxSize='16px' />
                    <Text color='gray.400'>
                        <b>4</b> profiles found
                    </Text>
                </HStack>
            )}
            {dummyProfiles.length > 0 ? (
                <OrderedList
                    listStyleType='none'
                    ml='0'
                    borderX='2px solid'
                    borderBottom='2px solid'
                    borderColor='#ECECEC'
                    shadow='lg'
                >
                    {dummyProfiles.map((profile) => (
                        <ListItem key={profile.id} borderTop='2px solid' borderColor='#ECECEC'>
                            <Profile
                                {...profile}
                                selected={ids.includes(profile.id)}
                                onClick={
                                    ids.includes(profile.id)
                                        ? () => setIds((state) => state.filter((id) => id !== profile.id))
                                        : () => setIds((state) => [...state, profile.id])
                                }
                            />
                        </ListItem>
                    ))}
                </OrderedList>
            ) : (
                <VStack px='40px' mt='40px'>
                    <Image src='/sad.svg' boxSize='24px' />
                    <Text fontSize='12px' textAlign='center' color='#A0AEC0'>
                        You haven&apos;t discovered anyone yet. Go out and meet some people!
                    </Text>
                </VStack>
            )}
            {dummyProfiles.length > 0 && (
                <Flex justifyContent='center'>
                    <Button disabled={!ids.length} mt='40px'>
                        Follow {ids.length} Profile{ids.length === 1 ? '' : 's'}
                    </Button>
                </Flex>
            )}
        </Box>
    );
};
