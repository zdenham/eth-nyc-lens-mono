import { Box, BoxProps, Flex, Heading, HStack, Image, ListItem, OrderedList, Text } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import { pagePaddingX } from '../constants';
import { useFollowAll, useFollowing } from '../utils/lens';
import { useCloseUsers } from '../utils/navigation';
import { Button } from './Button';
import { Profile } from './Profile';

export const ProfileDiscovery: React.FC<BoxProps> = ({ ...otherProps }) => {
    const { closeUsers } = useCloseUsers();
    const [ids, setIds] = useState([]);

    const { followAll, isFetching, error } = useFollowAll();
    const { refreshFollowing } = useFollowing();

    useEffect(() => {
        const newIds = closeUsers.map((user) => user.id);
        setIds(newIds);
    }, [closeUsers]);

    const handleFollowClick = useCallback(async () => {
        await followAll(ids);
        await refreshFollowing();
    }, [ids]);

    return (
        <Box py='40px' px={pagePaddingX} {...otherProps}>
            <Heading as='h2' fontSize='16px'>
                Profile Discovery
            </Heading>
            <Text>
                Interact with a profile to toggle its selection. The button below will follow all selected profiles at
                once.
            </Text>
            <HStack mt='40px'>
                <Image src='/users.svg' boxSize='16px' />
                <Text color='gray.400'>
                    <b>{ids.length}</b> profiles found
                </Text>
            </HStack>
            <OrderedList
                listStyleType='none'
                ml='0'
                borderX='2px solid'
                borderBottom='2px solid'
                borderColor='#ECECEC'
                shadow='lg'
            >
                {closeUsers.map((profile) => (
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
            <Flex justifyContent='center'>
                <Button
                    disabled={!ids.length}
                    mt='40px'
                    onClick={handleFollowClick}
                    isLoading={isFetching}
                    loadingText='waiting...'
                >
                    Follow {ids.length} Profile{ids.length === 1 ? '' : 's'}
                </Button>
                {error ? <Text>{error}</Text> : null}
            </Flex>
        </Box>
    );
};
