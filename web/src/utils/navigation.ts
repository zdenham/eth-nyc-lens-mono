import { useEffect, useState, useCallback } from 'react';
import {
    ProfileWithLocation,
    Location,
    useProfile,
    filterOutFollowedUsers,
} from './lens';

export const useLocation = () => {
    const [err, setErr] = useState('');
    const [location, setLocation] = useState<Location | null>(null);

    const onLocationUpdate = async (position: GeolocationPosition) => {
        const newLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };

        setLocation(newLocation);
    };

    useEffect(() => {
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
    }, []);

    return { err, location };
};

// polls to find close users
// TODO - dedoop against follows
export const useCloseUsers = () => {
    const [error, setError] = useState('');
    const [closeUsers, setCloseUsers] = useState<ProfileWithLocation[] | null>(
        null
    );
    const { profile } = useProfile();
    const { location } = useLocation();

    const findCloseUsers = useCallback(async () => {
        try {
            if (!profile || !location) {
                return;
            }

            const myUser: ProfileWithLocation = {
                ...profile,
                location,
                lastSeenTimestamp: Date.now(),
            };

            const res = await fetch('http://localhost:3500/users-close-to-me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myUser),
            });

            const { data } = await res.json();

            const usersToDiscover = await filterOutFollowedUsers(
                profile.address,
                data
            );

            setCloseUsers(usersToDiscover);
        } catch (e) {
            setError(e.message);
        }
    }, [profile, location]);

    useEffect(() => {
        // poll for close users every 3 seconds
        const interval = setInterval(findCloseUsers, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [profile, location]);

    return { closeUsers, error };
};
