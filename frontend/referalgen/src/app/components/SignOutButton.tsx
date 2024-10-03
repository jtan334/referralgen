"use client";

import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useRouter } from "next/navigation"; // Use 'next/navigation'

const SignOutButton = () => {
    const router = useRouter(); // Get the router instance

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            router.push("/"); // Redirect to the home page or any other page
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };

    return (
        <div className="mx-3">
            <button className="" onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    );
}

export default SignOutButton;
