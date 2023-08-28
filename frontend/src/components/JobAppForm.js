import React, { useState } from 'react';

function JobAppForm({ jobId, applyToJob }) {
  const [profileNftAccountId, setProfileNftAccountId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleApply = async () => {
    await applyToJob(jobId, profileNftAccountId);
    setSuccessMessage('Applied successfully!');
    // Redirect to a confirmation page after applying
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Profile NFT Account ID"
        value={profileNftAccountId}
        onChange={(e) => setProfileNftAccountId(e.target.value)}
      />
      <button onClick={handleApply}>Apply</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default JobAppForm;
