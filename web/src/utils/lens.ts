import { ethers, Signer } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import { useSigner } from 'wagmi';
import fetchProfileQuery from './graphql/fetchProfileQuery';
import type { LensHub } from '../../../lens/typechain-types/LensHub';
import requestChallenge from './graphql/requestChallenge';
import authenticate from './graphql/authenticate';
import following from './graphql/following';

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
    const lensHubProxyAddressMumbai =
        '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
    const ILensHub = require('../../../lens/artifacts/contracts/interfaces/ILensHub.sol/ILensHub.json');
    const lensHub = ethers.ContractFactory.getContract(
        lensHubProxyAddressMumbai,
        ILensHub.abi,
        signer
    );

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

const transformProfile = (lensProfile: any): Profile => {
    // note: we just go with the first profile for now

    if (!lensProfile) {
        throw new Error('No Profile found');
    }

    return {
        id: lensProfile.id,
        name: lensProfile.name,
        handle: lensProfile.handle,
        address: lensProfile.ownedBy,
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

export const useFollowing = () => {
    const [myFollowing, setMyFollowing] = useState<Profile[]>([]);
    const [error, setErr] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const { data: signer } = useSigner();

    const refreshFollowing = useCallback(async () => {
        try {
            setIsFetching(true);
            setErr('');
            if (!signer) {
                throw new Error('NOT SIGNED IN!!!');
            }
            const address = await signer.getAddress();

            const res = await fetchGraphql(following(address));
            const { data } = await res.json();

            const followedProfiles = data.following.items.map((item) =>
                transformProfile(item.profile)
            );

            setMyFollowing(followedProfiles);
            setIsFetching(false);
        } catch (e) {
            setIsFetching(false);
            setErr(e.message);
        }
    }, [signer]);

    useEffect(() => {}, [signer]);

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

            setProfile(transformProfile(data.data.profiles.items[0]));
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
                const tx = await lensHub.follow(
                    idsToFollow,
                    new Array(idsToFollow.length).fill([])
                );

                await tx.wait();

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
