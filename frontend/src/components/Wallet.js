import React from 'react';
import { Wallet } from './utils/near-wallet'; // Adjust the import path

const walletConfig = {
  networkId: 'testnet', // or 'mainnet'
  walletUrl: 'https://wallet.near.org',
  appTitle: 'my-dapp',
};

const wallet = new Wallet({
  createAccessKeyFor: 'kishoraditya.testnet', // Omit for all transactions
  network: walletConfig.networkId,
  walletUrl: walletConfig.walletUrl,
});

function WalletComponent() {
  const handleSignIn = () => {
    wallet.signIn();
  };

  const handleSignOut = () => {
    wallet.signOut();
  };

  return (
    <div>
      {wallet.accountId ? (
        <>
          <p>Logged in as: {wallet.accountId}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In with NEAR</button>
      )}
    </div>
  );
}

export default WalletComponent;
