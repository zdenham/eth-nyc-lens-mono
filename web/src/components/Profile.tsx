import { Avatar, Button, ButtonProps, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import formatTimeDifference from '../utils/formatTimeDifference';
import type { Profile as ProfileModel } from '../utils/lens';

export interface ProfileProps extends ProfileModel, Omit<ButtonProps, 'name' | 'id'> {
    readonly selected?: boolean;
    readonly lastSeenTimestamp?: number;
}

export const Profile: React.FC<ProfileProps> = ({
    selected,
    imageUrl,
    name,
    bio,
    handle,
    lastSeenTimestamp,
    numFollowers,
    numFollowing,
    onClick,
    ...otherProps
}) => {
    const isMobile = useMediaQuery(768);

    return (
        <Button
            bg='white'
            _hover={{ bg: 'gray.100' }}
            rounded='none'
            w='100%'
            h='auto'
            onClick={onClick}
            {...otherProps}
        >
            <HStack alignItems='flex-start' px={{ base: '12px', lg: '20px' }} py='16px'>
                <HStack alignItems='center'>
                    {selected && (
                        <Image src='/check.svg' boxSize={{ base: '24px', md: '32px' }} alignSelf='center' mr='12px' />
                    )}
                    <Avatar src={imageUrl} boxSize={{ base: '32px', md: '48px' }} px={{ md: '4px', lg: '10px' }} />
                </HStack>
                <VStack alignItems='flex-start' spacing='0' fontWeight={400}>
                    <HStack>
                        {!isMobile && (
                            <Text as='span' fontWeight='bold'>
                                {name}
                            </Text>
                        )}
                        <Text as='span'>{handle}</Text>
                    </HStack>
                    <Text
                        display={{ base: 'none', xl: 'block' }}
                        fontSize='14px'
                        pt='4px'
                        w={{ xl: '300px' }}
                        textAlign='left'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                    >
                        {bio}
                    </Text>
                    <HStack pt='8px' spacing='4px'>
                        <Image src='/sparkles.svg' boxSize='16px' />
                        <Text as='span' color='gray.400' fontSize='12px'>
                            Refreshed {formatTimeDifference(lastSeenTimestamp)} ago
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </Button>
    );
};
