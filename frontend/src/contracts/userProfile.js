//userProfile.js - UserProfile methods
import { Contract } from './contract/UserProfile'; // Adjust the import path

export async function createProfile(profile) {
  const contract = new Contract(); // Instantiate the contract
  await contract.create_profile(profile);
}

export async function getProfile(accountId) {
  const contract = new Contract(); // Instantiate the contract
  const profile = await contract.get_profile(accountId);
  return profile;
}

// Add more contract interaction functions as needed
