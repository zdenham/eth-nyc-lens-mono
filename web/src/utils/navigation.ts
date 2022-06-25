import type { Profile } from './lens';

const onPositionUpdate = async (
    position: GeolocationPosition,
    profile: Profile
) => {
    const myUser = {
        locaiton: {
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
