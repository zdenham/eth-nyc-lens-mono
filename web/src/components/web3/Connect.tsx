import {
    WagmiConfig,
    createClient,
    useAccount,
    useConnect,
    useDisconnect,
    useContract,
    useSigner,
} from 'wagmi';

import { InjectedConnector } from 'wagmi/connectors/injected';

function Connect() {
    const { data } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { disconnect } = useDisconnect();

    if (data) {
        return (
            <div>
                Connected to {data.address}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        );
    }
    return <button onClick={() => connect()}>Connect Wallet</button>;
}

export default Connect;
