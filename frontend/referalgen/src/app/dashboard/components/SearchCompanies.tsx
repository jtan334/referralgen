'use client';
import React, { useState } from 'react';
import { Company } from '../../types/types';

interface SearchCompaniesProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
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

      return (
        company.approval === 'approved' &&
        (normalizedCompanyName.includes(normalizedValue) ||
          normalizedProductName.includes(normalizedValue))
      );
    });

    setFilteredCompanies(filtered);
  };

  const handleCompanyClick = (company: Company) => {
    onSelectCompany(company);
    setSearchTerm('');
    setFilteredCompanies([]);
  };

  return (
    <div className="relative">
      <div className="form-control">
        <label className="label">
          <span className="text-2xl label-text text-gray">Search Companies</span>
        </label>
        <input
          type="text"
          placeholder="Search by company or product name"
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full bg-white text-black"
        />
      </div>

      {filteredCompanies.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto">
          {filteredCompanies.map(company => (
            <li
              key={company.idCompanies}
              className="px-4 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0 transition-colors"
              onClick={() => handleCompanyClick(company)}
            >
              <div className="font-medium text-black">{company.companyName}</div>
              <div className="text-sm text-gray-500">{company.productName}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCompanies;