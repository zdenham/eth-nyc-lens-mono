import { useEffect, useState, } from 'react';

export interface ProfileModel {
    id: string;
    handle: string;
    address: string;
    numFollowers: number;
    numFollowing: number;
    imageUrl: string | null;
    name: string | null;
    bio: string | null;
}

const dummyProfiles = [{
    id: '1',
    handle: 'shandy',
    address: '0xc4DaD120712A92117Cc65D46514BE8B49ED846a1',
    numFollowers: 420,
    numFollowing: 69,
    imageUrl: 'https://img.seadn.io/files/bbf0bb0f03f96e4c3244b2a8d77ad5df.png?fit=max&w=120',
    name: 'Shandy Sulen',
    bio: 'Hacking on Flourish!'
}];

export const useProfiles = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [profiles, setProfiles] = useState<ProfileModel[] | undefined>(undefined);

    // Replace with implementation to fetch profiles
    useEffect(() => {
        setIsFetching(true);
        setTimeout(() => {
            setProfiles(dummyProfiles);
            setIsFetching(false);
        }, 5000);
    }, []);

    return { profiles, isFetching };
};
