'use client';
import React, { useState, useEffect } from 'react';
import SearchCompanies from './SearchCompanies';
import UserLinks from './UserLinks';
import SelectedCompany from './SelectedCompany';

interface Link {
  uid: string;
  owner: string;
  companyName: string;
  productName: string;
  country: string;
  active: boolean;
  refLink: string;
  seen: number;
  used: number;
}

interface Company {
  idCompanies: number;
  companyName: string;
  productName: string;
  linkFormat: string;
  country: string;
}

const ServiceSelector = () => {
  const [selectedHeading, setSelectedHeading] = useState<string>('My Links');
  const [links, setLinks] = useState<Link[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // State for selected company

  const renderContent = () => {
    if (selectedHeading === 'Generate Links') {
      return (
        <>
          <SearchCompanies
            companies={companies}
            onSelectCompany={(company) => {
              setSelectedCompany(null); // Clear current selection
              setTimeout(() => setSelectedCompany(company), 0); // Reset selectedCompany with a new one
            }}
          />
          {selectedCompany && <SelectedCompany company={selectedCompany} />}
        </>
      );
    } else if (selectedHeading === 'My Links') {
      return <UserLinks links={links} companies={companies} />;
    } else {
      return <p>Select a Service</p>;
    }
  };

  const fetchUserLinks = async (userId: string) => {
    const response = await fetch(`/api/user/?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user links');
    return response.json();
  };

  const fetchCompanies = async () => {
    const response = await fetch(`/api/company/`);
    if (!response.ok) throw new Error('Failed to get company links');
    return response.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [linkData, companyData] = await Promise.all([
          fetchUserLinks('Test'),
          fetchCompanies(),
        ]);
        setLinks(linkData);
        setCompanies(companyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-auto p-4">
      {/* Centered Tabs */}
      <div className="flex items-center justify-center space-x-5 w-[80%]">
        <span
          className={`cursor-pointer text-4xl font-bold ${
            selectedHeading === 'Generate Links' ? 'text-cerulean' : 'text-ymblue'
          }`}
          onClick={() => {
            setSelectedHeading('Generate Links');
            setSelectedCompany(null); // Reset selected company when switching
          }}
        >
          Generate Links
        </span>
        <div className="h-8 w-px bg-gray-400"></div>
        <span
          className={`cursor-pointer text-4xl font-bold ${
            selectedHeading === 'My Links' ? 'text-cerulean' : 'text-ymblue'
          }`}
          onClick={() => setSelectedHeading('My Links')}
        >
          My Links
        </span>
      </div>

      {/* Content */}
      <div className="mt-6 w-full min-h-[300px]">{renderContent()}</div>
    </div>
  );
};

export default ServiceSelector;
