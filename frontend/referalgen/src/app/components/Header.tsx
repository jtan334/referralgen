"use client";
import React from "react";
import SignOutButton from "./SignOutButton";
import { useAuth } from "../firebase/AuthContext";

const Header = () => {
  const { user } = useAuth();
  
  return (
    <div className="navbar bg-ymblue sticky top-0 z-50 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white hover:text-saffron transition-colors">ReferralGen</a>
      </div>
      <div className="flex-none gap-2">
        <SignOutButton />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-saffron transition-all"
          >
            <div className="w-10 rounded-full overflow-hidden">
              <img
                alt={user?.name || "User profile"}
                src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a className="hover:bg-customwhite">Profile</a>
            </li>
            <li>
              <a className="hover:bg-customwhite">Settings</a>
            </li>
            <li>
              <a className="hover:bg-customwhite text-red-500">Delete Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
