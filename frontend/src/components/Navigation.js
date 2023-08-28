import React from 'react';
import { Link } from 'react-router-dom';
import WalletComponent from './Wallet'; // Adjust the import path

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/nft">Profile NFT</Link></li>
        <li><WalletComponent /></li> {/* Show NEAR wallet component */}
      </ul>
    </nav>
  );
}

export default Navigation;
