import { WagmiConfig, createClient } from 'wagmi';

import { getDefaultProvider, Signer } from 'ethers';

import { useEffect } from 'react';
import { useCloseUsers } from '../utils/navigation';

function LensProfile() {
    const { closeUsers } = useCloseUsers();

    useEffect(() => {
        console.log('THE CLOSE USERS!!', closeUsers);
    }, [closeUsers]);

    return (
        <div>
            <button type="button">Test Stuff</button>
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
            <div style={{ height: 200 }} />
            <LensProfile />
        </WagmiConfig>
    );
};

export default Web3Stuff;
