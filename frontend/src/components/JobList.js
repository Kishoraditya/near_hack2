//JobList.js - List job openings
import React from 'react';

function JobList({ jobs }) {
  return (
    <div>
      <h2>Job Openings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
