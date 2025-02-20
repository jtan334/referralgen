'use client';
import React, { useState } from 'react';
import SearchCompanies from './SearchCompanies';
import {Company, Link} from '../../types/types'
import { useAuth } from '@/app/firebase/AuthContext';


interface AddNewLinkProps {
  onClose: () => void;
  onAddLink: (newLink: Link) => void;
  companies: Company[];
}

function AddNewLink({ onClose, onAddLink, companies }: AddNewLinkProps) {
  const {user} = useAuth();
  const [linkData, setLinkData] = useState<Link>({
    uid: '',
    owner: user?.uid || '',
    companyName: '',
    productName: '',
    country: '',
    active: true,
    refLink: '',
    seen: 0,
    used: 0,
    created: new Date(), // Current date and time in UTC
    updated: new Date(), // Current date and time in UTC
  });

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setLinkData((prevData) => ({
      ...prevData,
      companyName: company.companyName,
      productName: company.productName,
      country: company.country,
    }));
  };

  const handleResetSelection = () => {
    setSelectedCompany(null);
    setLinkData((prevData) => ({
      ...prevData,
      companyName: '',
      productName: '',
      country: '',
    }));
  };

  const handleAddLink = () => {
    if (selectedCompany && linkData.refLink !== '') {
      onAddLink(linkData);
      console.log(linkData);
      onClose();
    }
  };

  // Determine if the Add Link button should be enabled
  const isAddLinkDisabled = !selectedCompany || linkData.refLink === '';

  return (
    <div className="p-2 border border-gray-300 rounded-md shadow-md">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-red-500">X</button>
      </div>

      {/* Conditional Rendering */}
      {selectedCompany ? (
        <div className="border p-2 rounded bg-gray-100 flex justify-between items-center">
          <div>
            <p><strong>Company:</strong> {selectedCompany.companyName}</p>
            <p><strong>Product:</strong> {selectedCompany.productName}</p>
            <p><strong>Country:</strong> {selectedCompany.country}</p>
          </div>
          <button onClick={handleResetSelection} className="text-red-500 text-xl">X</button>
        </div>
      ) : (
        <SearchCompanies companies={companies} onSelectCompany={handleCompanySelect} />
      )}

      <div>
        <label>
          Referral Link:
          <input
            name="refLink"
            type="text"
            value={linkData.refLink}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-x focus:ring-0 focus:border bg-white text-gray text-xl"
          />
        </label>
      </div>

      {/* Conditionally render the label */}
      {isAddLinkDisabled && (
        <p className="text-red-500 text-center mt-2">
          Please select a company, product, and enter a referral link.
        </p>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddLink}
          className={`btn btn-primary ${isAddLinkDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isAddLinkDisabled}
        >
          Add Link
        </button>
      </div>
    </div>
  );
}

export default AddNewLink;
