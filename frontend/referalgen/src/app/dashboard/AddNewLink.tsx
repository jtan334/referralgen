'use client';
import React, { useState } from 'react';
import SearchCompanies from './SearchCompanies';

interface Company {
  idCompanies: number;
  companyName: string;
  productName: string;
  linkFormat: string;
  country: string;
}

interface AddNewLinkProps {
  onClose: () => void;
  onAddLink: (newLink: any) => void;
  companies: Company[];
}

function AddNewLink({ onClose, onAddLink, companies }: AddNewLinkProps) {
  const [linkData, setLinkData] = useState({
    uid: '',
    owner: '',
    companyName: '',
    productName: '',
    country: '',
    active: true,
    refLink: '',
    seen: 0,
    used: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanySelect = (selectedCompany: Company) => {
    setLinkData((prevData) => ({
      ...prevData,
      companyName: selectedCompany.companyName,
      productName: selectedCompany.productName,
      country: selectedCompany.country,
    }));
  };

  const handleAddLink = () => {

    console.log(companies)
    onAddLink(linkData);
    onClose();
  };

  return (
    
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-red-500">X</button>
      </div>

      {/* SearchCompanies Component */}
      <SearchCompanies companies={companies} onSelectCompany={handleCompanySelect} />

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

      <div className="flex justify-center mt-4">
        <button onClick={handleAddLink} className="btn btn-primary">Add Link</button>
      </div>
    </div>
  );
}

export default AddNewLink;
