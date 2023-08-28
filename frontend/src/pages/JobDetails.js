//JobDetails.js - View specific job details
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobDetails } from './contract/jobsMarket'; // Adjust the import path
import ProfileNFT from './components/ProfileNFT'; // Adjust the import path

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      const fetchedJob = await getJobDetails(jobId);
      setJob(fetchedJob);
    }
    fetchJob();
  }, [jobId]);

  return (
    <div>
      {job ? (
        <div>
          <h2>{job.title}</h2>
          <p>Description: {job.description}</p>
          <p>Location: {job.location}</p>
          {/* Display other job details */}
          <ProfileNFT tokenId={job.profileNftTokenId} /> {/* Display NFT component */}
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}

export default JobDetails;
