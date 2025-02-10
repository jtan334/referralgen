'use client';
import React, { useState, useEffect } from 'react';
import { useLinkGeneration } from './useLinkGeneration';
import LinkDisplay from './LinkDisplay';
import {Company} from '../types/types'

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
    <div className="my-10 mx-10 py-5 px-5 bg-customwhite relative shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      {/* Changed shadow class to use a custom uniform shadow */}
      <button
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-2xl font-bold text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
        onClick={handleClear}
      >
        ×
      </button>
      <h2 className="text-xl font-bold text-black">{company.companyName}</h2>
      <p className="text-lg">{company.productName}</p>
      <div className="flex justify-center items-center h-full">
        <button onClick={handleGenerateLink} className="btn btn-primary mt-2 content-center">
          Generate Link
        </button>
      </div>

      {showLink && <LinkDisplay selectedLink={selectedLink} currentUserUid='string'/>}
    </div>
  );
};

export default SelectedCompany;