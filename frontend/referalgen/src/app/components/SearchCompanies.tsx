'use client'
import React from 'react';


const SearchCompanies = () => {
  return (
    <div className="outline my-10 mx-10 py-5 px-5">
      <h1 className="text-2xl text-[#3E6259] font">Search Companies</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-x focus:ring-0 focus:border bg-white text-gray text-xl"
        />
        <button className="btn btn-outline ml-3 outline-sage text-gray text-xl hover:bg-ymblue hover:text-white">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchCompanies;
