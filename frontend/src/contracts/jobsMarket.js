//jobsMarket.js - JobsMarket methods
import { Contract } from './contract/JobsMarket'; // Adjust the import path

export async function postJob(jobDetails) {
  const contract = new Contract(); // Instantiate the contract
  await contract.post_job(jobDetails);
}

export async function getJobs() {
  const contract = new Contract(); // Instantiate the contract
  const jobs = await contract.get_jobs();
  return jobs;
}

export async function applyToJob(jobId, profileNftAccountId) {
  const contract = new Contract(); // Instantiate the contract
  await contract.apply_to_job(jobId, profileNftAccountId);
}

// Add more contract interaction functions as needed
