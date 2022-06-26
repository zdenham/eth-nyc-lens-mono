import { useEffect, useState, useCallback } from 'react';
import { Profile, useFetchProfile } from './lens';

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

type Location = {
    lat: number;
    long: number;
};

export const useLocation = () => {
    const { profile } = useFetchProfile();
    const [err, setErr] = useState('');
    const [location, setLocation] = useState<Location | null>(null);

    const onLocationUpdate = useCallback(
        async (position: GeolocationPosition) => {
            const newLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude,
            };

            setLocation(newLocation);

            if (!profile) {
                return;
            }

            const myUser = {
                location: newLocation,
                lastSeenTimestamp: Date.now(),
                ...profile,
            };
            window.localStorage.setItem(
                'latest-profile',
                JSON.stringify(myUser)
            );
            await fetch('http://localhost:3500/update-coords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myUser),
            });
        },
        [profile]
    );

    window.navigator.geolocation.getCurrentPosition(
        (el) => onLocationUpdate(el),
        (e) => {
            setErr(e.message);
        },
        { enableHighAccuracy: true, maximumAge: 60000 }
    );
    window.navigator.geolocation.watchPosition(
        (el) => onLocationUpdate(el),
        (e) => {
            setErr(e.message);
        },
        { enableHighAccuracy: true, maximumAge: 60000 }
    );

    return { err, location };
};

// polls to find close users
// TODO - dedoop against follows
export const useCloseUsers = () => {
    const [error, setError] = useState('');
    const [closeUsers, setCloseUsers] = useState<ProfileWithLocation[] | null>(
        null
    );

    const findCloseUsers = async () => {
        try {
            setError('');
            const myProfile = window.localStorage.getItem('latest-profile');
            if (!myProfile) {
                return;
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
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        // poll for close users every 3 seconds
        const interval = setInterval(findCloseUsers, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return [closeUsers, error];
};
