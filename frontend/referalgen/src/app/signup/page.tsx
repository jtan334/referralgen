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
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-customwhite to-ymblue">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-customwhite to-ymblue">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ymblue mb-2">Welcome to ReferalGen</h1>
          <p className="text-gray">Sign in or create an account to get started</p>
        </div>
        <div className="flex justify-center">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}

export default Page;
