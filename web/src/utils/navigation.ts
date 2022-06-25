import { useState } from 'react';
import type { Profile } from './lens';

type ProfileWithLocation = {
    location: { lat: number; long: number };
    lastSeenTimestamp: number;
    id: string;
    handle: string;
    address: string;
    numFollowers: number;
    numFollowing: number;
    imageUrl: string;
    name: string;
    bio: string;
};

const onPositionUpdate = async (
    position: GeolocationPosition,
    profile: Profile
) => {
    const myUser = {
        location: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        },
        lastSeenTimestamp: Date.now(),
        ...profile,
    };
    window.localStorage.setItem('latest-profile', JSON.stringify(myUser));
    await fetch('http://localhost:3500/update-coords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myUser),
    });
};

export const startListening = (profile: Profile) => {
    window.navigator.geolocation.getCurrentPosition(
        (el) => onPositionUpdate(el, profile),
        (e) => {
            alert(`error ${e}`);
            console.log('ERROR: ', e);
        },
        { enableHighAccuracy: true, maximumAge: 60000 }
    );
    window.navigator.geolocation.watchPosition(
        (el) => onPositionUpdate(el, profile),
        (e) => {
            alert(`error ${e}`);
            console.log('ERROR: ', e);
        },
        { enableHighAccuracy: true, maximumAge: 60000 }
    );
};

export const useFindCloseUsers = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');
    const [closeUsers, setCloseUsers] = useState<ProfileWithLocation[] | null>(
        null
    );

    const findCloseUsers = async () => {
        try {
            setError('');
            setIsFetching(true);
            const myProfile = window.localStorage.getItem('latest-profile');
            if (!myProfile) {
                throw new Error('Cannot find friends without user location');
            }

            const res = await fetch('http://localhost:3500/users-close-to-me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: myProfile,
            });

            const { data } = await res.json();

            setCloseUsers(data);
            setIsFetching(false);
        } catch (e) {
            setError(e.message);
        }
    };

    return [findCloseUsers, closeUsers, isFetching, error];
};
