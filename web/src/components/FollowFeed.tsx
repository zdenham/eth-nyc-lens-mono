/* eslint-disable max-len */
import { Box, BoxProps, Button, Flex, Heading, HStack, Image, Link, OrderedList, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import formatTimeDifference from '../utils/formatTimeDifference';
import { footerHeight, navBarHeight } from '../constants';
import { Profile, useFollowing } from '../utils/lens';

export interface FeedItemProps {
    readonly src: string;
    readonly name: string;
    readonly handle: string;
    readonly bio: string;
    readonly timestamp?: string;
}

const FeedItem: React.FC<Profile & { followedAt?: number }> = ({ imageUrl, name, bio, handle, followedAt }) => {
    const { push } = useRouter();

    const timeDiff = formatTimeDifference(followedAt);

    return (
        <Button
            bg='white'
            p='0'
            height='auto'
            w='100%'
            justifyContent='flex-start'
            rounded='0'
            _hover={{ bg: 'gray.100' }}
            borderTop='2px solid #ECECEC'
            onClick={() => push(`https://lenster.xyz/u/${handle}`)}
        >
            <HStack alignItems='flex-start' px='20px' py='16px'>
                <Image src={imageUrl} w='60px' h='60px' borderRadius='50%' />
                <VStack alignItems='flex-start' spacing='0' fontWeight={400}>
                    <HStack>
                        <Text as='span' fontWeight='bold'>
                            {name}
                        </Text>
                        <Text as='span'>{handle}</Text>
                    </HStack>
                    <Text fontSize='14px' pt='4px'>
                        {bio}
                    </Text>
                    <HStack pt='8px'>
                        <Image src='/clock.svg' boxSize='16px' />
                        {timeDiff ? (
                            <Text as='span' color='gray.400' fontSize='12px'>
                                Followed <b>{timeDiff}</b> ago
                            </Text>
                        ) : (
                            <Text as='span' color='gray.400' fontSize='12px'>
                                Some time ago.
                            </Text>
                        )}
                    </HStack>
                </VStack>
            </HStack>
        </Button>
    );
};

export const FollowFeed: React.FC<BoxProps> = (props) => {
    const { following } = useFollowing();

    return (
        <Box pt='40px' {...props}>
            <Box px='20px'>
                <Heading as='h2' fontSize='16px'>
                    Follow Feed
                </Heading>
                <Text>
                    Look through all the friends you made through Flourish. Interact with a profile to visit their{' '}
                    <Link href='https://lenster.xyz' target='_blank' textDecor='underline'>
                        Lenster
                    </Link>{' '}
                    profile.
                </Text>
                {following.length > 0 && (
                    <HStack mt='40px' justifyContent={{ base: 'center', md: 'flex-start' }}>
                        <Image src='/users.svg' boxSize='16px' />
                        <Text color='gray.400'>
                            <b>{following.length}</b> profiles followed via Flourish
                        </Text>
                    </HStack>
                )}
            </Box>
            {following.length ? (
                <OrderedList ml='0'>
                    {following.map((feedItem) => (
                        <FeedItem key={feedItem.handle} {...feedItem} />
                    ))}
                </OrderedList>
            ) : (
                <Flex h={{ base: 'auto', md: `calc(100vh - ${navBarHeight} - ${footerHeight})` }}>
                    <VStack px='40px' mt='40px' w='100%'>
                        <Image src='/sad.svg' boxSize='24px' />
                        <Text fontSize='12px' textAlign='center' color='#A0AEC0'>
                            You haven&apos;t followed anyone yet. Go out and meet some people!
                        </Text>
                    </VStack>
                </Flex>
            )}
        </Box>
    );
};
