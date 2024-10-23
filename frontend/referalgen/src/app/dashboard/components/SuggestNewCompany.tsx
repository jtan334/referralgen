'use client'
import React, { useState } from 'react';

const SuggestNewCompany = () => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [referralLink, setReferralLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the form submission (e.g., send data to backend)
    console.log({ company, name, referralLink });
    // Clear the form or reset the state if needed
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold mb-4">Suggest New Company and Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 ">Company</label>
          <input
            type="text"
            id="company"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="referralLink" className="block text-sm font-medium text-gray-700">Referral Link</label>
          <input
            type="url"
            id="referralLink"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white"
            value={referralLink}
            onChange={(e) => setReferralLink(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestNewCompany;
