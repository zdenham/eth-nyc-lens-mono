import { ethers, Signer } from 'ethers';
import fetchProfileQuery from './graphql/fetchProfileQuery';
import type { LensHub } from '../../../lens/typechain-types/LensHub';
import requestChallenge from './graphql/requestChallenge';
import authenticate from './graphql/authenticate';

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

const transformProfile = (response: any): Profile => {
    // note: we just go with the first profile for now
    const lensProfile = response.data.profiles.items[0];

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

export const fetchProfile = async (address: string): Promise<Profile> => {
    const query = fetchProfileQuery(address);

    const res = await fetchGraphql(query);

    const data = await res.json();

    return transformProfile(data);
};

export const followAll = async (signer: Signer, idsToFollow: string[]) => {
    const lensHub = getLensContract(signer);
    await lensHub.follow(idsToFollow, new Array(idsToFollow.length).fill([]));
};
