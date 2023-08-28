//Profile.js - View user profile
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from './contract/userProfile'; // Adjust the import path

function Profile() {
  const { accountId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const fetchedProfile = await getProfile(accountId);
      setProfile(fetchedProfile);
    }
    fetchProfile();
  }, [accountId]);

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Display other profile fields */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
