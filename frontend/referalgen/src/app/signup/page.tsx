"use client"; // This indicates that this component is a client component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the router
import { auth, provider } from '../firebase/Firebase';
import {
  signInWithRedirect,
  getRedirectResult,
  User,
} from 'firebase/auth';

// Component: SignUp
const SignUp: React.FC = () => {
  const router = useRouter();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); // State to manage user sign-in

  useEffect(() => {
    const checkSignInResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user: User | null = result.user;
          if (user) {
            console.log('User signed in:', user);
            setIsUserSignedIn(true); // Update state if user is signed in
            router.push('/dashboard'); // Redirect to dashboard
          }
        }
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    };

    checkSignInResult();
  }, [router]);

  // Function to handle sign-in button click
  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign In with Google</h2>
      <button
        onClick={handleSignIn}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Sign In
      </button>
      {isUserSignedIn && <p>User is signed in!</p>} {/* Optional message for user feedback */}
    </div>
  );
};

export default SignUp;
