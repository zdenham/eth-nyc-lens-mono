import { ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { ProfileModel } from '../hooks/useProfiles';

interface ProfileProps extends ProfileModel, Omit<ButtonProps, 'name' | 'id'> { }

export const Profile: React.FC<ProfileProps> = () => (
    <>ima a profile</>
);
