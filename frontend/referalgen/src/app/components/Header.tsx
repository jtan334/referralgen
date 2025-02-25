"use client";
import React from "react";
import SignOutButton from "./SignOutButton";
import { useAuth } from "../firebase/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="navbar bg-ymblue sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">ReferralGen</a>
      </div>
      <div className="flex-none gap-2">
        <SignOutButton />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User profile"
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                onLoad={() => console.log("Image loaded successfully")}
                onError={(e) => {
                  console.log("Image failed to load:", user?.photoURL);
                  (e.target as HTMLImageElement).src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Delete Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
