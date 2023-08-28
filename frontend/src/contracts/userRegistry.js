//userRegistry.js - UserRegistry methods
import { Contract } from './contract/UserRegistry'; // Adjust the import path

export async function signupUser() {
  const contract = new Contract(); // Instantiate the contract
  await contract.signup_user();
}

export async function loginUser() {
  const contract = new Contract(); // Instantiate the contract
  const userInfo = await contract.login();
  return userInfo;
}

// Add more contract interaction functions as needed
