import { Box, BoxProps, Button, Heading, HStack, Image, Link, OrderedList, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const dummyFeedItems: FeedItemProps[] = [{
    src: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    src: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    src: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}, {
    src: '/dan.png',
    name: 'Dan Abramov',
    handle: '@dan.lens',
    bio: 'lorem ipsum da da id est cum sum',
}];

export interface FeedItemProps {
    readonly src: string;
    readonly name: string;
    readonly handle: string;
    readonly bio: string;
    readonly timestamp?: string;
}

const FeedItem = ({ src, name, bio, handle }) => {
    const { push } = useRouter();

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
                <Image src={src} />
                <VStack alignItems='flex-start' spacing='0' fontWeight={400}>
                    <HStack>
                        <Text as='span' fontWeight='bold'>{name}</Text>
                        <Text as='span'>{handle}</Text>
                    </HStack>
                    <Text fontSize='14px' pt='4px'>{bio}</Text>
                    <HStack pt='8px'>
                        <Image src='/clock.svg' boxSize='16px' />
                        <Text as='span' color='gray.400' fontSize='12px'>Followed 5 mins ago</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Button>
    );
};


export const FollowFeed: React.FC<BoxProps> = (props) => {
    return (
        <Box pt='40px' {...props}>
            <Box px='20px' shadow='lg'>
                <Heading as='h2' fontSize='16px'>Follow Feed</Heading>
                <Text>Look through all the friends you made through Flourish. Interact with a profile to visit their <Link href='https://lenster.xyz' target='_blank' textDecor='underline'>Lenster</Link> profile.</Text>
                <HStack mt='40px'>
                    <Image src='/users.svg' boxSize='16px' />
                    <Text color='gray.400'>5 profiles followed via Flourish</Text>
                </HStack>
            </Box>
            <OrderedList ml='0'>
                {dummyFeedItems.map((feedItem) => (
                    <FeedItem key={feedItem.handle} {...feedItem} />
                ))}
            </OrderedList>
        </Box>
    );
};
