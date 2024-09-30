'use client';
import React, { useState } from 'react';

interface Company {
  idCompanies: number;
  companyName: string;
  productName: string;
  linkFormat: string;
  country: string;
}

interface SearchCompaniesProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void; // Callback to pass the selected company to the parent
}

const SearchCompanies = ({ companies, onSelectCompany }: SearchCompaniesProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredCompanies([]); // Clear results if input is empty
      return;
    }

    const normalizedValue = value.replace(/\s+/g, '').toLowerCase();

    const filtered = companies.filter(company => {
      const normalizedCompanyName = company.companyName.replace(/\s+/g, '').toLowerCase();
      const normalizedProductName = company.productName.replace(/\s+/g, '').toLowerCase();
      
      return (
        normalizedCompanyName.includes(normalizedValue) ||
        normalizedProductName.includes(normalizedValue)
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
    <div className="my-10 mx-10 py-5 px-5">
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
        <ul className="mt-4">
          {filteredCompanies.map(company => (
            <li 
              key={company.idCompanies} 
              className="text-gray text-lg cursor-pointer hover:underline"
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
