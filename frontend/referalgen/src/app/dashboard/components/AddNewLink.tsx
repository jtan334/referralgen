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

  const isAddLinkDisabled = !selectedCompany || linkData.refLink === '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card bg-white w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-ymblue mb-4">Add New Link</h2>

          {/* Selected Company Display or Search */}
          {selectedCompany ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-300 shadow-sm mb-4 relative">
              <button
                onClick={handleResetSelection}
                className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost hover:bg-red-100 hover:text-red-600 text-gray-400"
                aria-label="Remove selection"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-3 pr-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Company</p>
                  <p className="text-base text-gray-900">{selectedCompany.companyName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Product</p>
                  <p className="text-basetext-gray-800">{selectedCompany.productName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Country</p>
                  <p className="text-base font-medium text-gray-700">{selectedCompany.country}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <SearchCompanies companies={companies} onSelectCompany={handleCompanySelect} />
            </div>
          )}

          {/* Referral Link Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Referral Link</span>
            </label>
            <input
              name="refLink"
              type="text"
              placeholder="https://example.com/ref=yourcode"
              value={linkData.refLink}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-white text-black text-base"
            />
          </div>

          {/* Error Message */}
          {isAddLinkDisabled && (
            <div className="alert alert-warning mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm">Please select a company and enter a referral link.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions justify-end mt-6">
            <button
              type="button"
              className="btn bg-gray hover:bg-opacity-90 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={handleAddLink}
              className="btn bg-cerulean hover:bg-opacity-90 text-white"
              disabled={isAddLinkDisabled}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewLink;