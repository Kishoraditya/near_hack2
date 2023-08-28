//SignUp.js - User registration form
import React, { useState } from 'react';
import { signupUser } from './contract/userRegistry'; // Adjust the import path

function SignUp() {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    await signupUser();
    setSuccessMessage('Sign up successful!');
    // Redirect to home page or other destination
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={handleSignUp}>Sign Up</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default SignUp;
