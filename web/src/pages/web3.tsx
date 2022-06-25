import {
    WagmiConfig,
    createClient,
    useAccount,
    useConnect,
    useDisconnect,
    useContract,
    useSigner,
} from 'wagmi';

import { getDefaultProvider, Signer } from 'ethers';

import { useState } from 'react';
import type { LensHub } from '../../../lens/typechain-types/LensHub';

import Connect from '../components/web3/Connect';
import { fetchProfile, followAll, loginLens } from '../utils/lens';

function LensProfile() {
    const { data: signer } = useSigner();

    const testStuff = async (currSigner: Signer) => {
        await loginLens(currSigner);
    };

    return (
        <div>
            <button type="button" onClick={() => testStuff(signer)}>
                Test Stuff
            </button>
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
