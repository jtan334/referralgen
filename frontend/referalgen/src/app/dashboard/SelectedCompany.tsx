'use client';
import React, { useState, useEffect } from 'react';
import { useLinkGeneration } from './useLinkGeneration';
import LinkDisplay from './LinkDisplay';
import { Company } from '../types/types';

interface SelectedCompanyProps {
  company: Company | null;
}

const SelectedCompany = ({ company }: SelectedCompanyProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const { selectedLink, showLink, handleGenerateLink } = useLinkGeneration(company);

  useEffect(() => {
    if (company) {
      setVisible(true);
    }
  }, [company]);

  const handleClear = () => {
    setVisible(false);
  };

  if (!visible || !company) return null;

  return (
    <div className="my-6 mx-auto max-w-md">
      <div className="card bg-white shadow-xl">
        <div className="card-body">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            ×
          </button>

          {/* Company Info */}
          <div className="mb-4">
            <h2 className="card-title text-ymblue text-xl mb-1">
              {company.companyName}
            </h2>
            <p className="text-gray text-base">{company.productName}</p>
            <p className="text-gray-400 text-sm mt-1">{company.country}</p>
          </div>

          {/* Generate Button */}
          <div className="card-actions justify-center mt-2">
            <button
              onClick={handleGenerateLink}
              className="btn bg-cerulean hover:bg-opacity-90 text-white w-full"
            >
              Generate Link
            </button>
          </div>

          {/* Link Display */}
          {showLink && (
            <div className="mt-4">
              <LinkDisplay selectedLink={selectedLink} currentUserUid="string" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedCompany;