'use client';
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (company) {
      setVisible(true); // Reset visibility when a new company is selected
    }
  }, [company]);

  const handleGenerateLink = () => {
    console.log(`Generating link for ${company?.companyName} - ${company?.productName}`);
  };

  const handleClear = () => {
    setVisible(false); // Hide the component when 'X' is clicked
  };

  if (!visible || !company) return null;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-100 relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={handleClear}
      >
        X
      </button>
      <h2 className="text-xl font-bold">{company.companyName}</h2>
      <p className="text-lg">{company.productName}</p>
      <button onClick={handleGenerateLink} className="btn btn-primary mt-2">
        Generate Link
      </button>
    </div>
  );
};

export default SelectedCompany;
