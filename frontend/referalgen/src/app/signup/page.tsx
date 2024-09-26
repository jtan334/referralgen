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
      
        <SignInButton /> 
      
    </div>
  );
}

export default Page;
