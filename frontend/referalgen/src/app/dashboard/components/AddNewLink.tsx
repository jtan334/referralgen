'use client';
import React, { useState } from 'react';
import SearchCompanies from './SearchCompanies';
import { Company, Link } from '../../types/types';
import { useAuth } from '@/app/firebase/AuthContext';

interface AddNewLinkProps {
  onClose: () => void;
  onAddLink: (newLink: Link) => void;
  companies: Company[];
}

function AddNewLink({ onClose, onAddLink, companies }: AddNewLinkProps) {
  const { user } = useAuth();
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
    created: new Date(),
    updated: new Date(),
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Referral Link</h2>
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Company Selection Area */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Company Information</h3>
          
          {selectedCompany ? (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Company:</span> {selectedCompany.companyName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Product:</span> {selectedCompany.productName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Country:</span> {selectedCompany.country}
                  </p>
                </div>
                <button 
                  onClick={handleResetSelection} 
                  className="btn btn-xs btn-circle btn-ghost text-gray-500"
                  title="Change company"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <SearchCompanies companies={companies} onSelectCompany={handleCompanySelect} />
          )}
        </div>

        {/* Referral Link Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700">Referral Link</span>
          </label>
          <input
            name="refLink"
            type="text"
            value={linkData.refLink}
            onChange={handleInputChange}
            placeholder="Enter your referral link here"
            className="input input-bordered w-full bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        {/* Error Message */}
        {isAddLinkDisabled && !selectedCompany && (
          <p className="text-sm text-amber-600 mt-2">
            Please select a company first
          </p>
        )}
        
        {isAddLinkDisabled && selectedCompany && linkData.refLink === '' && (
          <p className="text-sm text-amber-600 mt-2">
            Please enter your referral link
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLink}
            className={`btn btn-primary btn-sm ${isAddLinkDisabled ? 'btn-disabled' : ''}`}
            disabled={isAddLinkDisabled}
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewLink;