// SignIn.js
import React, { useEffect } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Firebase auth setup
const auth = getAuth();
const provider = new GoogleAuthProvider();

const SignIn = () => {
  const navigate = useNavigate();

  // Handle the redirect result on component mount
  useEffect(() => {
    // Check if there is a redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          console.log('User signed in:', user);

          // Navigate to another page after successful login (e.g., Dashboard)
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error('Sign-in error:', error);
      });
  }, [navigate]);

  // Function to handle sign in button click
  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={handleSignIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
