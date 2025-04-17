"use client";
import React, { useEffect, useState } from "react";
import SignInButton from "./SignInButton";
import { auth } from "../firebase/Firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        console.log("User is logged in:", currentUser);
        router.push('/dashboard'); // Redirect to dashboard if user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  return (
    <div>
      <div className ="text-4xl text-center m-9">Sign Up or Sign In with your Google Account</div>
        <div className="m-5 justify-self-center"><SignInButton /></div>
         
      
    </div>
  );
}

export default Page;
