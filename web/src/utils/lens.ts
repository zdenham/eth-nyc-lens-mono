import { ethers, Signer } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useSigner } from 'wagmi';
import { stringify } from 'querystring';
import fetchProfileQuery from './graphql/fetchProfileQuery';
import type { LensHub } from './LensHub';
import requestChallenge from './graphql/requestChallenge';
import authenticate from './graphql/authenticate';
import following from './graphql/following';
import lensAbi from './lensAbi';

export type Location = {
    lat: number;
    long: number;
};

export type ProfileWithLocation = {
    location: Location;
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

export type Profile = {
    id: string;
    handle: string;
    address: string;
    numFollowers: number;
    numFollowing: number;
    imageUrl: string | null;
    name: string | null;
    bio: string | null;
};

const fetchGraphql = async (query: string, token?: string) => {
    const accessHeader = token ? { 'x-access-token': token } : {};

    return fetch('https://api-mumbai.lens.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...accessHeader,
        },
        body: JSON.stringify({
            query,
        }),
    });
};

export const getLensContract = (signer: Signer) => {
    const lensHubProxyAddressMumbai = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

    const lensHub = ethers.ContractFactory.getContract(lensHubProxyAddressMumbai, lensAbi, signer);

    return lensHub as unknown as LensHub;
};

export const loginLens = async (signer: Signer) => {
    const address = await signer.getAddress();
    const res = await fetchGraphql(requestChallenge(address));
    const {
        data: {
            challenge: { text },
        },
    } = await res.json();

    const sigRes = await signer.signMessage(text);

    const authRes = await fetchGraphql(authenticate(address, sigRes));
    const authData = await authRes.json();

    const { accessToken, refreshToken } = authData.data.authenticate;

    window.localStorage.setItem('lens-access-token', accessToken);
    window.localStorage.setItem('lens-refresh-token', accessToken);

    return { accessToken, refreshToken };
};

const transformProfile = (lensProfile: any, address: string): Profile => {
    // note: we just go with the first profile for now

    if (!lensProfile) {
        return {
            id: '0x0',
            address,
            name: '',
            handle: '',
            bio: '',
            numFollowers: 0,
            numFollowing: 0,
            imageUrl: '',
        };
    }

    return {
        id: lensProfile.id,
        name: lensProfile.name,
        handle: lensProfile.handle,
        address,
        bio: lensProfile.bio,
        numFollowers: lensProfile.stats.totalFollowers,
        numFollowing: lensProfile.stats.totalFollowing,
        imageUrl: lensProfile.picture?.original?.url || null,
    };
};

export const filterOutFollowedUsers = async (
    myAddress: string,
    users: ProfileWithLocation[]
): Promise<ProfileWithLocation[]> => {
    const res = await fetchGraphql(following(myAddress));
    const { data } = await res.json();

    const followedIds = data.following.items.map((item) => item.profile.id);

    return users.filter((user) => !followedIds.includes(user.id));
};

// TODO - implement filtering via flourish based on local storage
export const useFollowing = () => {
    const [myFollowing, setMyFollowing] = useState<Profile[] & { followedAt?: number }>([]);
    const [error, setErr] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const { data: signer } = useSigner();

    const refreshFollowing = useCallback(async () => {
        try {
            setIsFetching(true);
            setErr('');
            const address = await signer.getAddress();

            const res = await fetchGraphql(following(address));
            const { data } = await res.json();

            const followedAtMap = JSON.parse(window.localStorage.getItem('following-via-flourish') || '[]').reduce(
                (acc, { id, timestamp }) => ({
                    ...acc,
                    [id]: timestamp,
                }),
                {}
            );

            const followedProfiles = data.following.items.map((item) => ({
                ...transformProfile(item.profile, item.profile.ownedBy),
                followedAt: followedAtMap[item.profile.id],
            }));

            setMyFollowing(followedProfiles);
            setIsFetching(false);
        } catch (e) {
            console.log('ERROR: ', e);
            setIsFetching(false);
            setErr(e.message);
        }
    }, [signer]);

    useEffect(() => {
        if (!signer) {
            return;
        }

        refreshFollowing();
    }, [signer]);

    return {
        following: myFollowing,
        refreshFollowing,
        isFetching,
        error,
    };
};

export const useProfile = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState('');
    const { data: signer } = useSigner();

    const fetchProfile = async (address: string) => {
        try {
            setError('');
            setIsFetching(true);

            const query = fetchProfileQuery(address);
            const res = await fetchGraphql(query);
            const data = await res.json();

            setProfile(transformProfile(data.data.profiles.items[0], address));
            setIsFetching(false);
        } catch (e) {
            console.log('ERROR: ', e);
            setError(e.message);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (!signer) {
            return;
        }

        signer.getAddress().then((address) => {
            fetchProfile(address);
        });
    }, [signer]);

    return { profile, isFetching, error };
};

export const useFollowAll = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState('');

    const { data: signer } = useSigner();

    const followAll = useCallback(
        async (idsToFollow: string[]) => {
            try {
                setError('');
                setIsFetching(true);

                if (!signer) {
                    throw new Error('No Signer available');
                }

                const lensHub = getLensContract(signer);
                const tx = await lensHub.follow(idsToFollow, new Array(idsToFollow.length).fill([]));

                await tx.wait();

                const followedViaFlourish = JSON.parse(window.localStorage.getItem('following-via-flourish') || '[]');
                const newFollowedWithDates = idsToFollow.map((id) => ({ id, followedAt: Date.now() }));

                window.localStorage.setItem(
                    'following-via-flourish',
                    JSON.stringify([...followedViaFlourish, ...newFollowedWithDates])
                );

                setIsFetching(false);
            } catch (e) {
                setError(e.message);
                setIsFetching(false);
            }
        },
        [setError, setIsFetching, signer]
    );

    return { followAll, isFetching, error };
};
