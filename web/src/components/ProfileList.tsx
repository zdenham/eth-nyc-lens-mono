import { ListItem, OrderedList, Text } from '@chakra-ui/react';
import React from 'react';
// import React, { useState } from 'react';
import { ProfileModel } from '../hooks/useProfiles';
import { Container } from './Container';
import { Heading } from './Heading';
import { Profile } from './Profile';

interface ProfileResultsProps {
    readonly profiles: ProfileModel[];
}

// const [selectedProfiles, setSelectedProfiles] = useState(profiles);
export const ProfileList: React.FC<ProfileResultsProps> = ({ profiles }) => (
    <Container>
        <Heading>Users found</Heading>
        <Text>Select users you&apos;d like to connect with.</Text>
        <OrderedList>
            {profiles.map((profile) => (
                <ListItem key={profile.id}>
                    <Profile {...profile} onClick={() => alert(`you tapped on profile with name ${profile.name}`)} />
                </ListItem>
            ))}
        </OrderedList>
    </Container>
);
