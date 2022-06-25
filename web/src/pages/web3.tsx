import {
    WagmiConfig,
    createClient,
    useAccount,
    useConnect,
    useDisconnect,
    useContract,
    useSigner,
} from 'wagmi';

import { getDefaultProvider } from 'ethers';

import { useState } from 'react';
import type { LensHub } from '../../../lens/typechain-types/LensHub';

import Connect from '../components/web3/Connect';

function LensProfile() {
    const [handle, setHandle] = useState('');
    const [idToFollow, setIdToFollow] = useState(0);
    const [profile, setProfile] = useState({});

    const { data: signer } = useSigner();

    const lensHubProxyAddress = '0x1A1FEe7EeD918BD762173e4dc5EfDB8a78C924A8';
    const ILensHub = require('../../../lens/artifacts/contracts/interfaces/ILensHub.sol/ILensHub.json');

    const lensHub = useContract<LensHub>({
        addressOrName: lensHubProxyAddress,
        contractInterface: ILensHub.abi,
        signerOrProvider: signer,
    });

    const handlehandleChange = (e) => {
        setHandle(e.target.value);
    };

    const fetchProfile = async () => {
        // note this is a workaround because running
        // a local lens api is probably a bitch
        // alternative is to run on testnet
        const profileId = (
            await lensHub.getProfileIdByHandle(handle)
        ).toNumber();
        const fetchedProfile = await lensHub.getProfile(profileId);

        console.log('fetchedProfile', fetchedProfile);

        setProfile({ profileId, imageURI: fetchedProfile.imageURI, handle });
    };

    const followProfileByIds = async (idsToFollow: number[]) => {
        await lensHub.follow(
            idsToFollow,
            new Array(idsToFollow.length).fill([])
        );
    };

    return (
        <div>
            <input
                onChange={handlehandleChange}
                value={handle}
                style={{
                    border: '1px solid black',
                    marginRight: 20,
                }}
            />
            <button type="button" onClick={fetchProfile}>
                Get it
            </button>

            {profile.profileId && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'center',
                        }}
                    >
                        <div>{profile.profileId}</div>
                        <img
                            alt="avatar"
                            src={profile.imageURI}
                            style={{ width: 100, height: 100, marginLeft: 20 }}
                        />
                        <div style={{ marginLeft: 20 }}>{profile.handle}</div>
                    </div>
                    <input
                        onChange={(e) => {
                            setIdToFollow(parseInt(e.target.value) || 0);
                        }}
                        value={idToFollow}
                        style={{
                            border: '1px solid black',
                            marginRight: 20,
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            followProfileByIds([idToFollow]);
                        }}
                    >
                        Follow
                    </button>
                </>
            )}
        </div>
    );
}

const Web3Stuff = () => {
    // NOTE: this is probably breaking ssr if we auto-connect
    const client = createClient({
        autoConnect: true,
        provider: getDefaultProvider(),
    });

    return (
        <WagmiConfig client={client}>
            <Connect />

            <LensProfile />
        </WagmiConfig>
    );
};

export default Web3Stuff;
