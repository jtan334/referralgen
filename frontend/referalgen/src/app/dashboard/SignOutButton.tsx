"use client";

import React from 'react'
import {  signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";




const SignOutButton = () => {
    const handleSignOut = async () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
          });
    }

  return (
    <div className ="mx-3">
        <button className ="" onClick={handleSignOut}>
            Sign Out
        </button>
    </div>
  )
}

export default SignOutButton