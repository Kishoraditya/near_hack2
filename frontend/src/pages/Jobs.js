//Jobs.js - Browse jobs 
import React, { useEffect, useState } from 'react';
import { getJobs } from './contract/jobsMarket'; // Adjust the import path
import JobList from './components/JobList'; // Adjust the import path

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Openings</h2>
      <JobList jobs={jobs} />
    </div>
  );
}

export default Jobs;
