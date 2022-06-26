import { HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ProfileModel } from '../hooks/useProfiles';

export interface ProfileProps extends ProfileModel, Omit<StackProps, 'name' | 'id'> {
    readonly selected?: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ selected, imageUrl, name, bio, handle, ...otherProps }) => (
    <HStack alignItems='flex-start' px='20px' py='16px' {...otherProps}>
        <HStack alignItems='center'>
            {selected && <Image src='/check.svg' boxSize='32px' alignSelf='center' />}
            <Image src={imageUrl} />
        </HStack>
        <VStack alignItems='flex-start' spacing='0' fontWeight={400}>
            <HStack>
                <Text as='span' fontWeight='bold'>{name}</Text>
                <Text as='span'>{handle}</Text>
            </HStack>
            <Text fontSize='14px' pt='4px'>{bio}</Text>
            <HStack pt='8px'>
                <Image src='/sparkles.svg' boxSize='16px' />
                <Text as='span' color='gray.400' fontSize='12px'>Discovered 5 mins ago</Text>
            </HStack>
        </VStack>
    </HStack>
);
