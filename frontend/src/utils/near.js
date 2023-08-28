//near.js - Helper functions for NEAR
import { providers } from 'near-api-js';

export async function getAccountBalance(accountId) {
  const near = await connectToNear();
  const account = await near.account(accountId);
  const state = await account.state();
  return state.amount;
}

async function connectToNear() {
  const nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
  };

  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  return near;
}
