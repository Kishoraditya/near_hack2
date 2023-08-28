//ProfileNFT.js - Display and purchase NFT
import React, { useState } from 'react';

function ProfileNFT({ tokenId, buyAccess }) {
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBuyAccess = async () => {
    await buyAccess(tokenId, price);
    setSuccessMessage('NFT purchased successfully!');
    // Redirect to a confirmation page after purchasing
  };

  return (
    <div>
      <p>Token ID: {tokenId}</p>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleBuyAccess}>Buy Access</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default ProfileNFT;
