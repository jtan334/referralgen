'use client';
import React, { useState, useEffect } from 'react';
import SearchCompanies from './components/SearchCompanies';
import UserLinks from './UserLinks';
import SelectedCompany from './SelectedCompany';
import FriendsList from '../components/FriendsList';
import { Link, Company } from '../types/types';
import { useAuth } from '../firebase/AuthContext';

const ServiceSelector = () => {
  const { user } = useAuth();
  const [selectedHeading, setSelectedHeading] = useState<string>('My Links');
  const [links, setLinks] = useState<Link[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const renderContent = () => {
    if (selectedHeading === 'Generate Links') {
      return (
        <>
          <SearchCompanies
            companies={companies}
            onSelectCompany={(company) => {
              setSelectedCompany(null);
              setTimeout(() => setSelectedCompany(company), 0);
            }}
          />
          {selectedCompany && <SelectedCompany company={selectedCompany} />}
        </>
      );
    } else if (selectedHeading === 'My Links') {
      return <UserLinks loadedLinks={links} companies={companies} refresh={fetchUserLinks} />;
    } else if (selectedHeading === 'Friend Links') {
      return <FriendsList />;
    } else {
      return <p>Select a Service</p>;
    }
  };

  const fetchUserLinks = async (userId: string) => {
    if (!user) return;
    const response = await fetch(`/api/user/?userId=${user.uid}`);
    if (!response.ok) throw new Error('Failed to fetch user links');
    return response.json();
  };

  const fetchCompanies = async () => {
    const response = await fetch(`/api/company/`);
    if (!response.ok) throw new Error('Failed to get companies');
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
            setSelectedCompany(null);
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
        <div className="h-8 w-px bg-gray-400"></div>
        <span
          className={`cursor-pointer text-4xl font-bold ${
            selectedHeading === 'Friend Links' ? 'text-cerulean' : 'text-ymblue'
          }`}
          onClick={() => setSelectedHeading('Friend Links')}
        >
          Friend Links
        </span>
      </div>

      {/* Content */}
      <div className="mt-6 w-full min-h-[300px]">{renderContent()}</div>
    </div>
  );
};

export default ServiceSelector;
