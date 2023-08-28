import React, { useState } from 'react';
import { createProfile } from './contract/userProfile'; // Adjust the import path

function CreateProfile() {
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    skills: [],
    experience: [],
    // Add other profile fields
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateProfile = async () => {
    await createProfile(profile);
    setSuccessMessage('Profile created successfully!');
    // Redirect to profile page or other destination
  };

  return (
    <div>
      <h2>Create Profile</h2>
      {/* Form to input profile details */}
      <button onClick={handleCreateProfile}>Create Profile</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CreateProfile;
