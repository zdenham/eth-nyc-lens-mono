import { Button, ButtonProps, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ProfileModel } from '../hooks/useProfiles';

export interface ProfileProps extends ProfileModel, Omit<ButtonProps, 'name' | 'id'> {
    readonly selected?: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ selected, imageUrl, name, bio, handle, onClick, ...otherProps }) => (
    <Button bg='white' _hover={{ bg: 'gray.100' }} rounded='none' w='100%' h='auto' onClick={onClick} {...otherProps}>
        <HStack alignItems='flex-start' px='20px' py='16px'>
            <HStack alignItems='center'>
                {selected && <Image src='/check.svg' boxSize='32px' alignSelf='center' mr='12px' />}
                <Image src={imageUrl} px='10px' />
            </HStack>
            <VStack alignItems='flex-start' spacing='0' fontWeight={400}>
                <HStack>
                    <Text as='span' fontWeight='bold'>{name}</Text>
                    <Text as='span'>{handle}</Text>
                </HStack>
                <Text fontSize='14px' pt='4px'>{bio}</Text>
                <HStack pt='8px' spacing='4px'>
                    <Image src='/sparkles.svg' boxSize='16px' />
                    <Text as='span' color='gray.400' fontSize='12px'>Discovered <b>5</b> mins ago</Text>
                </HStack>
            </VStack>
        </HStack>
    </Button>
);
