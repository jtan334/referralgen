'use client';
import React, { useState } from 'react';
import { Company } from '../../types/types';

interface SearchCompaniesProps {
  companies: Company[]; // Receives the companies list from the parent
  onSelectCompany: (company: Company) => void; // Callback to pass the selected company to the parent
}

const SearchCompanies = ({ companies, onSelectCompany }: SearchCompaniesProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredCompanies([]);
      return;
    }

    const normalizedValue = value.replace(/\s+/g, '').toLowerCase();

    const filtered = companies.filter(company => {
      const normalizedCompanyName = company.companyName.replace(/\s+/g, '').toLowerCase();
      const normalizedProductName = company.productName.replace(/\s+/g, '').toLowerCase();

      // Filter for companies with approval = "approved" and match search term
      return (
        company.approval === 'approved' && // Check if the company is approved
        (normalizedCompanyName.includes(normalizedValue) ||
          normalizedProductName.includes(normalizedValue))
      );
    });

    setFilteredCompanies(filtered);
  };

  const handleCompanyClick = (company: Company) => {
    onSelectCompany(company); // Pass the selected company back to the parent
    setSearchTerm(''); // Clear the search term
    setFilteredCompanies([]); // Clear the filtered results
  };

  return (
    <div className="relative my-10 mx-10 py-5 px-5">
      <h1 className="text-2xl text-[#3E6259] font">Search Companies</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Type here"
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-x focus:ring-0 focus:border bg-white text-gray text-xl"
        />
      </div>

      {filteredCompanies.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md">
          {filteredCompanies.map(company => (
            <li
              key={company.idCompanies}
              className="px-4 py-2 text-slate-500 text-lg cursor-pointer hover:bg-slate-200"
              onClick={() => handleCompanyClick(company)}
            >
              {company.companyName} - {company.productName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCompanies;
