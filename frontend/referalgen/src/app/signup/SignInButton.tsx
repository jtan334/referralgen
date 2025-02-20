// components/SignInButton.js
"use client";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const SignInButton = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log("User signed in:", user);
      // You can add additional logic here if needed (e.g., redirect, show a message).
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return <button onClick={handleGoogleSignIn} className="text-black">Sign in with Google</button>;
};

export default SignInButton;
