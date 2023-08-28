//profileNFT.js - ProfileNFT methods
import { Contract } from './contract/ProfileNFT'; // Adjust the import path

export async function mintNFT(tokenMetadata) {
  const contract = new Contract(); // Instantiate the contract
  const tokenId = await contract.nft_mint(tokenMetadata);
  return tokenId;
}

export async function transferNFT(receiverAccountId, tokenId) {
  const contract = new Contract(); // Instantiate the contract
  await contract.nft_transfer(receiverAccountId, tokenId);
}

export async function buyAccess(tokenId, price) {
  const contract = new Contract(); // Instantiate the contract
  const purchase = await contract.buy_access(tokenId, price);
  return purchase;
}

// Add more contract interaction functions as needed
