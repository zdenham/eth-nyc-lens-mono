import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { ProtocolState, waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('setup', 'unpauses the protocol').setAction(async ({}, hre) => {
  const [governance, , tester1, tester2, tester3] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
  console.log(await lensHub.getState());
  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  console.log(await lensHub.getState());

  await waitForTx(lensHub.whitelistProfileCreator(tester1.address, true));
  await waitForTx(lensHub.whitelistProfileCreator(tester2.address, true));
  await waitForTx(lensHub.whitelistProfileCreator(tester3.address, true));

  const inputStructBase = {
    imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
  };

  await waitForTx(
    lensHub
      .connect(tester1)
      .createProfile({ ...inputStructBase, to: tester1.address, handle: 'tester1' })
  );

  await waitForTx(
    lensHub
      .connect(tester2)
      .createProfile({ ...inputStructBase, to: tester2.address, handle: 'tester2' })
  );

  await waitForTx(
    lensHub
      .connect(tester3)
      .createProfile({ ...inputStructBase, to: tester3.address, handle: 'tester3' })
  );

  console.log(`Total supply (should be 3): ${await lensHub.totalSupply()}`);
  console.log(`Profile ID by handle tester1: ${await lensHub.getProfileIdByHandle('tester1')}`);
  console.log(`Profile ID by handle tester2: ${await lensHub.getProfileIdByHandle('tester2')}`);
  console.log(`Profile ID by handle tester3: ${await lensHub.getProfileIdByHandle('tester3')}`);
});
