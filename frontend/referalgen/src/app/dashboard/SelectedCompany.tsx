'use client';
import React, { useState, useEffect } from 'react';
import { useLinkGeneration } from './useLinkGeneration'; // Custom hook for link generation logic
import LinkDisplay from './LinkDisplay'; // Component to display selected link

interface Company {
  idCompanies: number;
  companyName: string;
  productName: string;
  linkFormat: string;
  country: string;
}

interface SelectedCompanyProps {
  company: Company | null;
}

const SelectedCompany = ({ company }: SelectedCompanyProps) => {
  const [visible, setVisible] = useState<boolean>(true);
  const { selectedLink, showLink, handleGenerateLink } = useLinkGeneration(company);

  useEffect(() => {
    if (company) {
      setVisible(true); // Reset visibility when a new company is selected
    }
  }, [company]);

  const handleClear = () => {
    setVisible(false); // Hide the component when 'X' is clicked
  };

  if (!visible || !company) return null;

  return (
    <div className="my-10 mx-10 py-5 px-5 border rounded bg-customwhite relative">
      <button
        className="absolute top-2 right-2 text-xl text-black hover:text-gray-700"
        onClick={handleClear}
      >
        X
      </button>
      <h2 className="text-xl font-bold text-black">{company.companyName}</h2>
      <p className="text-lg">{company.productName}</p>
      <div className="flex justify-center items-center h-full">
        <button onClick={handleGenerateLink} className="btn btn-primary mt-2 content-center">
          Generate Link
        </button>
      </div>

      {showLink && <LinkDisplay selectedLink={selectedLink} />}
    </div>
  );
};

export default SelectedCompany;
